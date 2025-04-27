const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Yoga', 'Nutrition', 'Mental Health', 'Fitness', 'Wellness']
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 
 