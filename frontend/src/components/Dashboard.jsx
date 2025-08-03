import React from 'react';
import { Heart, Users } from 'lucide-react';
import DonorTable from './DonorTable';
import DeliveryCharts from './DeliveryCharts';
import VolunteerResources from './VolunteerResources';
import StatsCards from './StatsCards';
import VolunteerTasks from './VolunteerTasks';
import './Dashboard.css';

import {
  donorData,
  monthlyDeliveries,
  volunteerFAQs,
  weeklyDeliveries,
  foodTypeDistribution,
} from '../data/SampleData';

const volunteerTasks = [
  {
    _id: "6860b3942f5c715918c04d23",
    donorId: "68607d331d3c08312f9e1889",
    donorName: "Test Donor",
    donorPhone: "9876543210",
    foodDescription: "Veg Biryani",
    quantity: 30,
    type: "veg",
    pickupAddress: "Madhura Nagar, Kamareddy",
    location: {
      type: "Point",
      coordinates: [78.4483, 17.4375],
    },
    preferredPickupTime: "2025-06-28T13:30:00.000+00:00",
    expiryTime: "2025-06-28T15:00:00.000+00:00",
    images: ["https://example.com/image1.jpg"],
    status: "pending",
    createdAt: "2025-06-29T03:31:32.265+00:00",
    __v: 0,
  },
  {
    _id: "6860b4732f5c715918c04d26",
    donorId: "68607d331d3c08312f9e1889",
    donorName: "Test Donor",
    donorPhone: "9876543210",
    foodDescription: "Veg Biryani",
    quantity: 30,
    type: "veg",
    pickupAddress: "Madhura Nagar, Kamareddy",
    location: {
      type: "Point",
      coordinates: [78.4483, 17.4375],
    },
    preferredPickupTime: "2025-06-28T13:30:00.000+00:00",
    expiryTime: "2025-06-28T15:00:00.000+00:00",
    images: ["https://example.com/image2.jpg"],
    status: "accepted",
    assignedVolunteer: "68607d331d3c08312f9e1889",
    createdAt: "2025-06-29T03:35:15.971+00:00",
    __v: 0,
  },
  {
    _id: "6860b52b2f5c715918c04d2c",
    donorId: "68607d331d3c08312f9e1889",
    donorName: "Test Donor",
    donorPhone: "9876543210",
    foodDescription: "Veg Biryani",
    quantity: 30,
    type: "veg",
    pickupAddress: "Madhura Nagar, Kamareddy",
    location: {
      type: "Point",
      coordinates: [78.4483, 17.4375],
    },
    preferredPickupTime: "2025-06-28T13:30:00.000+00:00",
    expiryTime: "2025-06-28T15:00:00.000+00:00",
    images: ["https://example.com/image3.jpg"],
    status: "accepted",
    assignedVolunteer: "6860afc514723031fefd1993",
    createdAt: "2025-06-29T03:38:19.024+00:00",
    __v: 0,
  }
];

const Dashboard = () => {
  const totalDeliveries = 127;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-inner">
            <div className="dashboard-brand">
              <div className="dashboard-icon">
                <Heart className="icon" />
              </div>
              <div>
                <h1 className="dashboard-title">Volunteer Dashboard</h1>
                <p className="dashboard-subtitle">Food Rescue & Distribution</p>
              </div>
            </div>
          </div>
          <div className="dashboard-welcome">
            <Users className="icon-small" />
            <span>Welcome back, Volunteer!</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats */}
        <section className="dashboard-section col-span-1 md:col-span-2 lg:col-span-3">
          <StatsCards donorData={donorData} totalDeliveries={totalDeliveries} />
        </section>

        {/* Volunteer Tasks */}
        <section className="dashboard-section col-span-1 md:col-span-2 lg:col-span-3">
          <VolunteerTasks tasks={volunteerTasks} />
        </section>

        {/* Charts */}
        <section className="dashboard-section col-span-1 md:col-span-2 lg:col-span-3">
          <DeliveryCharts
            monthlyData={monthlyDeliveries ?? []}
            weeklyData={weeklyDeliveries ?? []}
            foodTypeData={foodTypeDistribution ?? []}
          />
        </section>

        {/* Table + Sidebar */}
        <div className="dashboard-grid col-span-1 md:col-span-2 lg:col-span-3">
          <div className="dashboard-main-content">
            <DonorTable data={donorData} />
          </div>
          <aside className="dashboard-sidebar">
            <VolunteerResources faqs={volunteerFAQs} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;