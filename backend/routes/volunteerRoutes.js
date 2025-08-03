const express = require('express');
const router = express.Router();
const {
  getMyTasks,
  acceptPickup,
  markAsPickedUp,
  markAsDelivered,
} = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/tasks').get(protect, getMyTasks);
router.route('/donations/:id/accept').post(protect, acceptPickup);
router.route('/donations/:id/pickup').post(protect, markAsPickedUp);
router.route('/donations/:id/deliver').post(protect, markAsDelivered);

module.exports = router;