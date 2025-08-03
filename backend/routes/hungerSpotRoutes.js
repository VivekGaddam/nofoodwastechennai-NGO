const express = require('express');
const router = express.Router();
const {
  getHungerSpots,
  getNearbyHungerSpots,
  createHungerSpot,
} = require('../controllers/hungerSpotController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHungerSpots)
  .post(protect, createHungerSpot); 

router.route('/nearby')
  .get(getNearbyHungerSpots);

module.exports = router;
