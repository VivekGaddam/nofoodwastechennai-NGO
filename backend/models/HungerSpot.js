const mongoose = require('mongoose');
const { Schema } = mongoose;

const HungerSpotSchema = new Schema({
  name: String,                      
  category: String,                
  contactPerson: String,
  phone: String,
  address: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number]
  },
  capacity: Number,
});

HungerSpotSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('HungerSpot', HungerSpotSchema);