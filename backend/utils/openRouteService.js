const axios = require('axios');

const getETA = async (origin, destination) => {
  try {
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/matrix/driving-car',
      {
        locations: [
          [origin.lng, origin.lat],
          [destination.lng, destination.lat],
        ],
        metrics: ['duration'],
        units: 'm',
      },
      {
        headers: {
          Authorization: process.env.OPEN_ROUTE_SERVICE_API_KEY, // Set this in your .env file
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.durations && response.data.durations[0] && response.data.durations[0][1]) {
      return response.data.durations[0][1] / 60; // Return duration in minutes
    }
    return Infinity; // Return a large value if no route is found
  } catch (error) {
    console.error('Error getting ETA from OpenRouteService:', error);
    return Infinity;
  }
};

module.exports = { getETA };