const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  
  passwordHash: {
    type: String,
    default: null
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  googleId: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['donor', 'volunteer', 'admin', 'staff'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number] 
    }
  },
  available: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true 
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
