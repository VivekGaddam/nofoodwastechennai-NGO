import axios from 'axios';

const API_URL = 'https://nofoodwastechennai-ngo.onrender.com/api'; // Assuming your backend runs on port 5000

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const registerUser = (userData) => apiService.post('/auth/register', userData);
export const loginUser = (userData) => apiService.post('/auth/login', userData);
export const registerDonor = (userData) => apiService.post('/auth/register-donor', userData);


export const createDonation = (donationData) => {
  return apiService.post('/donations', donationData);
};
export const getMyDonations = () => {
  return apiService.get('/donations/my');
};
export const cancelDonation = (id) => {
  return apiService.post(`/donations/${id}/cancel`);
};
export const getDonationById = (id) => {
  return apiService.get(`/donations/${id}`);
};

export const getHungerSpots = () => apiService.get('/hunger-spots');
export const createHungerSpot = (hungerSpotData) => {
  return apiService.post('/hunger-spots', hungerSpotData);
};
export const getNearbyHungerSpots = (lat, lng) => apiService.get(`/hunger-spots/nearby?lat=${lat}&lng=${lng}`);

export const getMyTasks = () => {
  return apiService.get('/volunteer/tasks');
};
export const acceptPickup = (id) => {
  return apiService.post(`/volunteer/donations/${id}/accept`);
};
export const markAsPickedUp = (id) => {
  return apiService.post(`/volunteer/donations/${id}/pickup`);
};
export const markAsDelivered = (id) => {
  return apiService.post(`/volunteer/donations/${id}/deliver`);
};

// WhatsApp Endpoints
export const sendWhatsAppMessage = (messageData) => {
  return apiService.post('/whatsapp/send', messageData);
};
