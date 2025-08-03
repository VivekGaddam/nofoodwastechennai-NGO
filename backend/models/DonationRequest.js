const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonationRequestSchema = new Schema({
  donorId: { type: Schema.Types.ObjectId, ref: 'User' },

  donorName: { type: String, required: true },      
  donorPhone: { type: String, required: true },      

  foodDescription: String,       
  quantity: Number,              
  type: { type: String, enum: ['veg', 'non-veg', 'mixed'] },
  pickupAddress: String,
  location: {
    type: {
      
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },

  preferredPickupTime: Date,
  expiryTime: Date,
  images: [String],              

  
  status: {
    type: String,
    enum: ['pending', 'accepted', 'picked', 'delivered', 'cancelled'],
    default: 'pending'
  },

  assignedVolunteer: { type: Schema.Types.ObjectId, ref: 'User' },
  deliveredTo: { type: Schema.Types.ObjectId, ref: 'HungerSpot' },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DonationRequest', DonationRequestSchema);
