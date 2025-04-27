const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    console.log('Password change attempt for user ID:', req.user.id);
    
    // Get user
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found for password change:', req.user.id);
      return res.status(404).json({ msg: 'User not found' });
    }

    console.log('Found user for password change:', {
      email: user.email,
      hasPassword: !!user.password
    });

    // Verify current password with simple comparison
    console.log('Verifying current password...');
    const isMatch = user.password === currentPassword;
    console.log('Current password verification:', { isMatch });

    if (!isMatch) {
      console.log('Current password verification failed for:', user.email);
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // Set new password (storing as plain text)
    user.password = newPassword;
    console.log('Setting new password for user:', user.email);

    await user.save();
    console.log('Password updated successfully for:', user.email);

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error('Password change error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router; 
 