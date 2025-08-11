const DonationRequest = require('../models/DonationRequest');
const User = require('../models/User'); // For Volunteers
const HungerSpot = require('../models/HungerSpot');
const VolunteerAssignmentLog = require('../models/VolunteerAssignmentLog');

const AVERAGE_SPEED_METERS_PER_MINUTE = 500; 
const PICKUP_BUFFER_MINUTES = 10; 
const DELIVERY_BUFFER_MINUTES = 5; 
const MAX_DELIVERY_TIME_MINUTES = 600;

exports.createDonation = async (req, res) => {
    try {
        const {
            donorId,
            donorName,
            donorPhone,
            foodDescription,
            quantity,
            type,
            pickupAddress,
            location, 
            preferredPickupTime,
            expiryTime,
            images
        } = req.body;

        const newDonationRequest = new DonationRequest({
            donorId,
            donorName,
            donorPhone,
            foodDescription,
            quantity,
            type,
            pickupAddress,
            location: {
                type: 'Point',
                coordinates: location.coordinates // [lng, lat]
            },
            preferredPickupTime,
            expiryTime,
            images,
            status: 'pending'
        });

        await newDonationRequest.save();

        // Find nearby volunteers...
        const potentialVolunteers = await User.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: location.coordinates },
                    distanceField: 'distanceToDonation',
                    spherical: true,
                    maxDistance: 20000,
                    query: { role: 'volunteer', available: true }
                }
            },
            { $sort: { distanceToDonation: 1 } },
            { $limit: 10 }
        ]);

        let assignedVolunteer = null;
        let assignedHungerSpot = null;
        let bestOverallTime = Infinity;

        for (const volunteer of potentialVolunteers) {
            const volunteerPickupTime = (volunteer.distanceToDonation / AVERAGE_SPEED_METERS_PER_MINUTE) + PICKUP_BUFFER_MINUTES;
            if (volunteerPickupTime >= MAX_DELIVERY_TIME_MINUTES) continue;

            const potentialHungerSpots = await HungerSpot.aggregate([
                {
                    $geoNear: {
                        near: { type: 'Point', coordinates: volunteer.location.coordinates },
                        distanceField: 'distanceToVolunteer',
                        spherical: true,
                        maxDistance: 20000,
                        query: { capacity: { $gt: 0 } }
                    }
                },
                { $sort: { distanceToVolunteer: 1 } },
                { $limit: 5 }
            ]);

            for (const hungerSpot of potentialHungerSpots) {
                const volunteerDeliveryTime = (hungerSpot.distanceToVolunteer / AVERAGE_SPEED_METERS_PER_MINUTE) + DELIVERY_BUFFER_MINUTES;
                const totalEstimatedTime = volunteerPickupTime + volunteerDeliveryTime;

                if (totalEstimatedTime <= MAX_DELIVERY_TIME_MINUTES && totalEstimatedTime < bestOverallTime) {
                    bestOverallTime = totalEstimatedTime;
                    assignedVolunteer = volunteer;
                    assignedHungerSpot = hungerSpot;
                }
            }
        }

        if (assignedVolunteer && assignedHungerSpot) {
            newDonationRequest.assignedVolunteer = assignedVolunteer._id;
            newDonationRequest.deliveredTo = assignedHungerSpot._id;
            newDonationRequest.status = 'accepted';
            await newDonationRequest.save();

            const assignmentLog = new VolunteerAssignmentLog({
                volunteerId: assignedVolunteer._id,
                donationId: newDonationRequest._id,
                statusTimeline: { acceptedAt: new Date() }
            });
            await assignmentLog.save();

            await User.findByIdAndUpdate(assignedVolunteer._id, { available: false });

            // --- REAL-TIME NOTIFICATION ---
            const io = req.app.get('io');
            const volunteerSockets = req.app.get('volunteerSockets');
            const volunteerSocketId = volunteerSockets[assignedVolunteer._id.toString()];
            if (volunteerSocketId) {
                io.to(volunteerSocketId).emit('newTask', {
                    donationId: newDonationRequest._id,
                    pickupAddress: pickupAddress,
                    hungerSpot: assignedHungerSpot.name,
                    estimatedTime: `${bestOverallTime.toFixed(2)} minutes`
                });
            }

            res.status(200).json({
                message: 'Donation created and assigned successfully!',
                donation: newDonationRequest,
                assignedVolunteer: assignedVolunteer.name,
                assignedHungerSpot: assignedHungerSpot.name,
                estimatedDeliveryTime: `${bestOverallTime.toFixed(2)} minutes`
            });
        } else {
            newDonationRequest.status = 'pending';
            await newDonationRequest.save();
            res.status(202).json({
                message: 'Donation created, but no volunteer found.',
                donation: newDonationRequest
            });
        }

    } catch (error) {
        console.error('Error creating donation and assigning:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.getTotalDeliveries = async (req, res) => {
  try {
    const count = await DonationRequest.countDocuments({ status: 'delivered' });
    res.json({ totalDeliveries: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMyDonations = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // 1. Get all assignments for this volunteer
    const assignments = await VolunteerAssignmentLog.find({ volunteerId: req.user._id })
      .select('donationId');

    if (!assignments.length) {
      return res.json([]); // No donations assigned
    }

    const donationIds = assignments.map(a => a.donationId);

    // 2. Get donation details (with donor info populated if needed)
    const donations = await DonationRequest.find({ _id: { $in: donationIds } })
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Error fetching my donations:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
