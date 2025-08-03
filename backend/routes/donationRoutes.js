const express = require('express');
const router = express.Router();
const {
  createDonation,
  getMyDonations,
  cancelDonation,
  getDonationById,
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createDonation);
// router.route('/my').get( getMyDonations);
// router.route('/:id/cancel').post( cancelDonation);
// router.route('/:id').get( getDonationById);

module.exports = router;