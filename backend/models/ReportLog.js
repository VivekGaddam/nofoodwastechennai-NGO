const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportLogSchema = new Schema({
  donationId: Schema.Types.ObjectId,
  donorId: Schema.Types.ObjectId,
  volunteerId: ObjectId,
  hungerSpotId: ObjectId,
  foodQuantity: Number,
  numberOfPeopleFed: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReportLog', ReportLogSchema);