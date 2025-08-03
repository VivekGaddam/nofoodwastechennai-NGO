const donationSchema = new mongoose.Schema({
  foodItems: String,
  pickupAddress: String,
  location: {
    lat: Number,
    lng: Number,
  },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'accepted', 'picked', 'delivered', 'cancelled'], default: 'pending' },
});
module.exports = mongoose.model('Donation', donationSchema);