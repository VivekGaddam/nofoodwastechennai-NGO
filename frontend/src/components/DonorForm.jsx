import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Camera } from "lucide-react";
import { createDonation } from "../apiService";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    donorName: "",
    foodDescription: "",
    quantity: "",
    donorPhone: "",
    location: "",
    pickupAddress: "",
    type: "veg",
    preferredPickupTime: "",
    expiryTime: "",
    images: [],
  });

  const [status] = useState("pending");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseCurrentLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch address");
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            pickupAddress: data.display_name || `${lat}, ${lng}`,
            location: `${lat}, ${lng}`,
          }));
        } catch (_err) {
          alert("Could not fetch address from location.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (_error) => {
        alert("⚠️ Could not fetch location. Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location) {
      alert("⚠️ Please use your location or enter coordinates manually.");
      return;
    }

    try {
      const coordinates = formData.location
        .split(",")
        .map((x) => parseFloat(x.trim()))
        .reverse(); 

      const donationData = {
        ...formData,
        location: {
          type: "Point",
          coordinates,
        },
        status,
        volunteerId: null,
        preferredPickupTime: new Date(
          formData.preferredPickupTime
        ).toISOString(),
        expiryTime: new Date(formData.expiryTime).toISOString(),
      };

      console.log("Donation data:", donationData);
      await createDonation(donationData);

      alert(
        "Thank you for your donation! We'll connect you with a volunteer soon."
      );
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("An error occurred while submitting your donation.");
    }
  };

  return (
    <div className="page-container">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="header"
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 className="header-title">🍽️ Food Donation</h1>
            <a href="/" className="nav-link">
              ← Back to Home
            </a>
          </div>
        </div>
      </motion.header>

      <div
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2
            className="hero-title"
            style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
          >
            Share Your{" "}
            <span style={{ color: "hsl(var(--primary))" }}>Food</span> with Love
          </h2>
          <p className="hero-subtitle">
            Help us reduce food waste and feed those in need. Every donation
            makes a difference in someone's life.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "white",
            borderRadius: "1.5rem",
            boxShadow: "var(--shadow-card)",
            border: "1px solid hsl(var(--border) / 0.5)",
            overflow: "hidden",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Donor Information Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: "hsl(var(--primary) / 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Users
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "hsl(var(--primary))",
                    }}
                  />
                </div>
                <h3 className="feature-title">Donor Information</h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    name="donorPhone"
                    value={formData.donorPhone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Food Details Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: "hsl(var(--accent) / 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "1.125rem" }}>🍽️</span>
                </div>
                <h3 className="feature-title">Food Details</h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label className="form-label">Food Description</label>
                  <textarea
                    name="foodDescription"
                    value={formData.foodDescription}
                    onChange={handleChange}
                    placeholder="Describe the food (e.g. Veg Biryani, Dal, Roti)"
                    className="form-textarea"
                    rows={3}
                    required
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label className="form-label">
                      Quantity (People Served)
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Food Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="veg">🥗 Vegetarian</option>
                      <option value="non-veg">🍗 Non-Vegetarian</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: "hsl(var(--secondary) / 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Clock
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "hsl(var(--secondary))",
                    }}
                  />
                </div>
                <h3 className="feature-title">Timing Details</h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label className="form-label">Preferred Pickup Time</label>
                  <input
                    type="datetime-local"
                    name="preferredPickupTime"
                    value={formData.preferredPickupTime}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Food Expiry Time</label>
                  <input
                    type="datetime-local"
                    name="expiryTime"
                    value={formData.expiryTime}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: "hsl(139 69% 19% / 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "hsl(139 69% 19%)",
                    }}
                  />
                </div>
                <h3 className="feature-title">Pickup Location</h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label className="form-label">Pickup Address</label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <textarea
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      required
                      rows={2}
                      className="form-textarea"
                      style={{ flex: 1 }}
                    />
                    <motion.button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={loadingLocation}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-location"
                    >
                      {loadingLocation ? "Fetching..." : "📍 Use Location"}
                    </motion.button>
                  </div>
                </div>

                {formData.location && (
                  <div>
                    <label className="form-label">Coordinates</label>
                    <input
                      type="text"
                      value={formData.location}
                      readOnly
                      className="form-input"
                      style={{
                        background: "hsl(var(--muted))",
                        color: "hsl(var(--muted-foreground))",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Images Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: "hsl(220 91% 56% / 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Camera
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "hsl(220 91% 56%)",
                    }}
                  />
                </div>
                <h3 className="feature-title">Food Images (Optional)</h3>
              </div>

              <div>
                <label className="form-label">Image URLs</label>
                <input
                  type="text"
                  name="images"
                  value={
                    Array.isArray(formData.images)
                      ? formData.images.join(",")
                      : ""
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      images: e.target.value
                        .split(",")
                        .map((url) => url.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  className="form-input"
                />
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--muted-foreground))",
                    marginTop: "0.5rem",
                  }}
                >
                  Separate multiple URLs with commas
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-submit"
              style={{
                background: "var(--gradient-primary)",
                fontSize: "1.125rem",
                padding: "1rem 2rem",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-warm)",
              }}
            >
              🎯 Submit Food Donation
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} No Food Waste. All rights reserved.
      </footer>
    </div>
  );
}
