const HungerSpot = require('../models/HungerSpot');

// @desc    Get all hunger spots
exports.getHungerSpots = async (req, res) => {
  try {
    const spots = await HungerSpot.find({});
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get nearby hunger spots
exports.getNearbyHungerSpots = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const spots = await HungerSpot.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // 5km
        },
      },
    });

    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new hunger spot
// @access  Private (Admin)
exports.createHungerSpot = async (req, res) => {
  try {
    const {
      name,
      category,
      contactPerson,
      phone,
      address,
      latitude,
      longitude,
      capacity,
    } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const spot = new HungerSpot({
      name,
      category,
      contactPerson,
      phone,
      address,
      location,
      capacity,
    });

    const createdSpot = await spot.save();
    res.status(201).json(createdSpot);
  } catch (error) {
    console.error("Error creating hunger spot:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};
