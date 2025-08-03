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
            status: 'pending' // Default status
        });

        await newDonationRequest.save();

        // 2. Find nearby and available volunteers
        // We'll search for volunteers within a reasonable radius, then filter by availability
        const potentialVolunteers = await User.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: location.coordinates },
                    distanceField: 'distanceToDonation', // distance in meters
                    spherical: true,
                    maxDistance: 20000, // Example: 20 km radius to find initial candidates
                    query: { role: 'volunteer', available: true } // Only available volunteers
                }
            },
            {
                $sort: { distanceToDonation: 1 } // Sort by closest volunteer first
            },
            {
                $limit: 10 // Limit to a few closest candidates
            }
        ]);

        let assignedVolunteer = null;
        let assignedHungerSpot = null;
        let bestOverallTime = Infinity; // To track the best possible delivery time

        // Iterate through potential volunteers to find the best match
        for (const volunteer of potentialVolunteers) {
            const volunteerPickupTime = (volunteer.distanceToDonation / AVERAGE_SPEED_METERS_PER_MINUTE) + PICKUP_BUFFER_MINUTES;

            // Only proceed if volunteer can reach pickup within a reasonable time for the overall delivery window
            if (volunteerPickupTime >= MAX_DELIVERY_TIME_MINUTES) {
                continue; // This volunteer is too far for pickup alone
            }

            // Find nearby HungerSpots for this volunteer
            const potentialHungerSpots = await HungerSpot.aggregate([
                {
                    $geoNear: {
                        near: { type: 'Point', coordinates: volunteer.location.coordinates },
                        distanceField: 'distanceToVolunteer', // distance in meters
                        spherical: true,
                        maxDistance: 20000, // Example: 20 km radius from volunteer
                        query: { capacity: { $gt: 0 } } // Ensure HungerSpot has capacity
                    }
                },
                {
                    $sort: { distanceToVolunteer: 1 }
                },
                {
                    $limit: 5 // Limit to a few closest hunger spots
                }
            ]);

            for (const hungerSpot of potentialHungerSpots) {
                const volunteerDeliveryTime = (hungerSpot.distanceToVolunteer / AVERAGE_SPEED_METERS_PER_MINUTE) + DELIVERY_BUFFER_MINUTES;
                const totalEstimatedTime = volunteerPickupTime + volunteerDeliveryTime;

                if (totalEstimatedTime <= MAX_DELIVERY_TIME_MINUTES) {
                    // This is a viable option. Check if it's the best so far.
                    if (totalEstimatedTime < bestOverallTime) {
                        bestOverallTime = totalEstimatedTime;
                        assignedVolunteer = volunteer;
                        assignedHungerSpot = hungerSpot;
                        // We found a good candidate, but let's continue searching for an even better one
                        // or you can break here if you want to assign to the first viable one found.
                    }
                }
            }
        }

        // 3. Assign if a suitable volunteer and HungerSpot are found
        if (assignedVolunteer && assignedHungerSpot) {
            newDonationRequest.assignedVolunteer = assignedVolunteer._id;
            newDonationRequest.deliveredTo = assignedHungerSpot._id;
            newDonationRequest.status = 'accepted'; // Or 'pending-assignment' if you want a separate state before volunteer acceptance
            await newDonationRequest.save();

            // Create a log entry
            const assignmentLog = new VolunteerAssignmentLog({
                volunteerId: assignedVolunteer._id,
                donationId: newDonationRequest._id,
                statusTimeline: { acceptedAt: new Date() } // Mark as accepted immediately
            });
            await assignmentLog.save();

            // Optional: Update volunteer's status to 'unavailable' or 'on-task'
            await User.findByIdAndUpdate(assignedVolunteer._id, { available: false });

            res.status(200).json({
                message: 'Donation created and assigned successfully!',
                donation: newDonationRequest,
                assignedVolunteer: assignedVolunteer.name,
                assignedHungerSpot: assignedHungerSpot.name,
                estimatedDeliveryTime: `${bestOverallTime.toFixed(2)} minutes`
            });
        } else {
            // No suitable volunteer and hunger spot combination found within the time limit
            // Optionally, you could mark the donation as 'unassigned' or 'requires manual review'
            newDonationRequest.status = 'pending'; 
            await newDonationRequest.save();
            res.status(202).json({
                message: 'Donation created, but no suitable volunteer or hunger spot found within 45 minutes. It will be reviewed manually.',
                donation: newDonationRequest
            });
        }

    } catch (error) {
        console.error('Error creating donation and assigning:', error);
        // If an error occurs after newDonationRequest.save(), you might want to consider rolling back
        // the donation creation if you were using transactions. For now, it will just remain in 'pending' or 'pending_manual_review'.
        res.status(500).json({ message: 'Server Error during donation creation or assignment.' });
    }
};





