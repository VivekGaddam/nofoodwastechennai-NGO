const mongoose = require('mongoose');
const { Schema } = mongoose;

const VolunteerAssignmentLogSchema = new Schema({
  volunteerId: { type: Schema.Types.ObjectId, ref: 'User' },
  donationId: { type: Schema.Types.ObjectId, ref: 'DonationRequest' },
  statusTimeline: {
    acceptedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date
  }
});

module.exports = mongoose.model('VolunteerAssignmentLog', VolunteerAssignmentLogSchema);