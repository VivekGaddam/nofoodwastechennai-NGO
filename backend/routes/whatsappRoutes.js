const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage } = require('../controllers/whatsappController');
const { protect } = require('../middleware/authMiddleware');
const axios = require('axios');
const { createDonation } = require('../controllers/donationController');


router.post('/send', protect, sendWhatsAppMessage);

// WhatsApp API credentials from .env file
const token = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;

// ⚠️ Note: In-memory session storage is not suitable for production.
// It will reset every time your server restarts. Consider using Redis or a database for session management.
const sessions = {};

const questions = [
    "Please enter your full name:",
    "Please enter your phone number (e.g., 91xxxxxxxxxx):",
    "Describe the food (e.g., Cooked Rice and Dal):",
    "Quantity (e.g., 'Serves 10 people'):",
    "Type (Veg/Non-Veg):",
    "Please provide a detailed pickup address:",
    "Location coordinates as 'longitude,latitude' (You can get this from Google Maps):",
    "Preferred pickup time (e.g., 'Today at 4 PM' or 'ASAP'):",
    "Expiry time (e.g., 'Tonight by 10 PM'):",
    "Do you have an image of the food? If so, please send it now. If not, just type 'No'." // Modified for better UX
];

/**
 * Helper function to send a WhatsApp message.
 * @param {string} to - The recipient's phone number.
 * @param {string} body - The message text.
 */
async function sendMessage(to, body) {
    try {
        await axios.post(
            `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                text: { body }
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        console.error('Error sending WhatsApp message:', error.response ? error.response.data : error.message);
    }
}

// GET /api/whatsapp/webhook - For webhook verification
router.get('/webhook', (req, res) => {
    const verifyToken = process.env.VERIFY_TOKEN;
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === verifyToken) {
        return res.send(req.query['hub.challenge']);
    }
    console.error('Failed webhook verification.');
    res.sendStatus(403);
});

// POST /api/whatsapp/webhook - Handles incoming messages
router.post('/webhook', async (req, res) => {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message) {
        const from = message.from; // Sender's phone number
        const text = message.text?.body?.trim();
        const image = message.image; // Check for an image message

        // Start a new session if one doesn't exist
        if (!sessions[from] && text && text.toLowerCase().includes('donate')) {
            sessions[from] = { step: 0, answers: {} };
            await sendMessage(from, "Welcome to the Food Donation Bot! 🍲\n\nLet's get some details about your donation.");
            await sendMessage(from, questions[0]);
        } else if (sessions[from]) {
            const session = sessions[from];
            
            // Handle image answer for the last question
            if (session.step === questions.length - 1) {
                if (image) {
                     // You would need to download the image from the URL provided by WhatsApp API
                     // For now, we'll just acknowledge it.
                     session.answers['images'] = ['image_received']; // Placeholder
                } else {
                     session.answers['images'] = [];
                }
            } else {
                // Map answers to keys for clarity
                const questionKeyMap = ['donorName', 'donorPhone', 'foodDescription', 'quantity', 'type', 'pickupAddress', 'coordinates', 'preferredPickupTime', 'expiryTime', 'images'];
                session.answers[questionKeyMap[session.step]] = text;
            }

            session.step++;

            if (session.step < questions.length) {
                await sendMessage(from, questions[session.step]);
            } else {
                // All questions answered, process the donation
                const {
                    donorName, donorPhone, foodDescription, quantity, type,
                    pickupAddress, coordinates, preferredPickupTime, expiryTime, images
                } = session.answers;

                try {
                    const [lng, lat] = coordinates.split(',').map(coord => parseFloat(coord.trim()));

                    // Mock request and response for the controller
                    const mockReq = {
                        body: {
                            donorId: null, // No authenticated user via WhatsApp
                            donorName, donorPhone, foodDescription, quantity, type, pickupAddress,
                            location: { coordinates: [lng, lat] },
                            preferredPickupTime, expiryTime,
                            images: images || []
                        }
                    };
                    
                    const result = await createDonation(mockReq); // Simplified call
                    
                    if (result.assignedVolunteer) {
                        await sendMessage(from, `✅ Thank you! Your donation has been assigned to ${result.assignedVolunteer}.\n\nHunger Spot: ${result.assignedHungerSpot}\nETA: ${result.estimatedDeliveryTime}`);
                    } else {
                        await sendMessage(from, `✅ Thank you! We've received your donation details. We are currently searching for a volunteer and will notify you as soon as one is assigned.`);
                    }

                } catch (e) {
                     console.error("Error processing donation from WhatsApp:", e);
                     await sendMessage(from, "❌ Sorry, there was an error processing your request. Please ensure the coordinates are in the 'longitude, latitude' format and try again.");
                } finally {
                    delete sessions[from]; // Clear the session
                }
            }
        }
    }
    res.sendStatus(200);
});

module.exports = router;