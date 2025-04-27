const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/auth/status
// @desc    Get authentication status and basic user info
// @access  Public
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      isAuthenticated: true,
      user: user
    });
  } catch (err) {
    console.error('Auth status check error:', err);
    res.status(401).json({
      isAuthenticated: false,
      error: 'Authentication failed'
    });
  }
});

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  try {
    console.log('Registration attempt for:', req.body.email);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user (storing password as plain text)
    user = new User({
      name,
      email,
      password
    });

    // Save user to database
    await user.save();
    console.log('User registered successfully:', {
      email: user.email
    });

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      }
    );
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  try {
    console.log('Login attempt started for:', req.body.email);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Verify password using direct comparison
    console.log('Attempting password comparison...');
    const isMatch = user.password === password;
    
    if (!isMatch) {
      console.log('Password match failed for user:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('Password verified successfully for:', email);

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };

    // Sign and return token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        console.log('Login successful, token generated for:', email);
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   PUT api/auth/profile
// @desc    Update user profile
// @access  Private
const profileUpdateValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail()
];

router.put('/profile', auth, profileUpdateValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { name, email, currentPassword, newPassword } = req.body;

    // Get user from database with password
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        msg: 'User not found' 
      });
    }

    console.log('Profile update attempt for user:', user.email);

    // Handle password change if requested
    if (newPassword) {
      // Require current password for password change
      if (!currentPassword) {
        return res.status(400).json({ 
          success: false,
          msg: 'Current password is required to change password' 
        });
      }

      // Verify current password using direct comparison
      const isMatch = user.password === currentPassword;
      console.log('Current password verification result:', isMatch);

      if (!isMatch) {
        return res.status(400).json({ 
          success: false,
          msg: 'Current password is incorrect' 
        });
      }

      // Set new password (as plain text)
      user.password = newPassword;
      console.log('New password set for user:', user.email);
    }

    // Check if email is already taken by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.user.id } 
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          msg: 'Email is already taken' 
        });
      }
    }

    // Update user fields
    user.name = name;
    user.email = email;

    // Save updated user
    await user.save();
    console.log('Profile updated successfully for user:', user.email);

    // Fetch fresh user data after save
    const updatedUser = await User.findById(user.id);

    const payload = {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name
      }
    };

    // Generate new token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('JWT Sign error:', err);
          throw err;
        }
        res.json({
          success: true,
          msg: 'Profile updated successfully',
          token,
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
          }
        });
      }
    );
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({
      success: false,
      msg: 'Server error during profile update',
      error: err.message
    });
  }
});

module.exports = router; 