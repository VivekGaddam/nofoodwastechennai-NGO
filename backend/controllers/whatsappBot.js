// whatsappBot.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { createDonation } = require('./donationController'); // Your existing code

const app = express();
app.use(bodyParser.json());

// WhatsApp API credentials
const token = process.env.WHATSAPP_TOKEN; 
const phoneNumberId = process.env.PHONE_NUMBER_ID;

// Temporary session storage (replace with Redis for production)
const sessions = {};

const questions = [
    "Please enter your full name:",
    "Please enter your phone number:",
    "Describe the food:",
    "Quantity:",
    "Type (Veg/Non-Veg):",
    "Pickup address:",
    "Location coordinates (lng,lat):",
    "Preferred pickup time (YYYY-MM-DD HH:mm):",
    "Expiry time (YYYY-MM-DD HH:mm):",
    "Image URLs (comma separated, optional):"
];

// GET webhook verification
app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        return res.send(req.query['hub.challenge']);
    }
    res.sendStatus(403);
});

// POST webhook - handle incoming messages
app.post('/webhook', async (req, res) => {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (message) {
        const from = message.from;
        const text = message.text?.body?.trim();

        if (!sessions[from]) {
            sessions[from] = { step: 0, answers: [] };
            await sendMessage(from, "Welcome to Food Donation Bot 🍲");
            await sendMessage(from, questions[0]);
        } else {
            const session = sessions[from];
            session.answers.push(text);
            session.step++;

            if (session.step < questions.length) {
                await sendMessage(from, questions[session.step]);
            } else {
                // Process the donation
                const [
                    donorName,
                    donorPhone,
                    foodDescription,
                    quantity,
                    type,
                    pickupAddress,
                    coordinates,
                    preferredPickupTime,
                    expiryTime,
                    images
                ] = session.answers;

                const [lng, lat] = coordinates.split(',').map(Number);

                // Call your controller directly
                const mockReq = {
                    body: {
                        donorId: null, // Or derive from auth
                        donorName,
                        donorPhone,
                        foodDescription,
                        quantity,
                        type,
                        pickupAddress,
                        location: { coordinates: [lng, lat] },
                        preferredPickupTime,
                        expiryTime,
                        images: images ? images.split(',') : []
                    }
                };
                const mockRes = {
                    status: (code) => ({
                        json: (data) => ({ code, data })
                    })
                };

                const result = await createDonation(mockReq, mockRes);

                // Respond to user
                if (result.data.assignedVolunteer) {
                    await sendMessage(from, `✅ Donation created and assigned to ${result.data.assignedVolunteer}.\nHunger Spot: ${result.data.assignedHungerSpot}\nETA: ${result.data.estimatedDeliveryTime}`);
                } else {
                    await sendMessage(from, `✅ Donation created but no volunteer found yet. We will notify you soon.`);
                }

                delete sessions[from]; // Clear session
            }
        }
    }
    res.sendStatus(200);
});

async function sendMessage(to, body) {
    await axios.post(
        `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
        {
            messaging_product: "whatsapp",
            to,
            text: { body }
        },
        { headers: { Authorization: `Bearer ${token}` } }
    );
}

app.listen(3000, () => console.log('WhatsApp bot server running'));
