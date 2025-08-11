const express = require('express');
const router = express.Router();
const {
  createDonation,
  getTotalDeliveries,
  getMyDonations,
  cancelDonation,
  getDonationById,
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');
router.get('/total-deliveries', protect, getTotalDeliveries);
router.route('/').post(createDonation);
router.route('/my').get(protect, getMyDonations);
// router.route('/:id/cancel').post( cancelDonation);
// router.route('/:id').get( getDonationById);

module.exports = router;