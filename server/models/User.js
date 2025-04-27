const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Method to check password (simple string comparison)
userSchema.methods.comparePassword = async function(password) {
  try {
    return this.password === password;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

// Static method to find user by credentials
userSchema.statics.findByCredentials = async function(email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema); 
 