import React from 'react';
import { Award, MapPin, TrendingUp, Package } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ donorData, totalDeliveries }) => {
  // Calculate top pickup location
  const locationCounts = donorData.reduce((acc, donor) => {
    acc[donor.location] = (acc[donor.location] || 0) + 1;
    return acc;
  }, {});

  const topLocation = Object.entries(locationCounts).reduce((a, b) =>
    locationCounts[a[0]] > locationCounts[b[0]] ? a : b
  )[0];

  // Calculate completion rate
  const completedDeliveries = donorData.filter(donor => donor.status === 'Delivered').length;
  const completionRate = Math.round((completedDeliveries / donorData.length) * 100);

  return (
    <div className="stats-grid">
      {/* Total Deliveries */}
      <div className="stat-card bg-blue-gradient">
        <div className="stat-card-header">
          <p className="stat-card-title">Total Deliveries</p>
          <Package className="stat-card-icon" />
        </div>
        <p className="stat-card-value">{totalDeliveries}</p>
        {totalDeliveries > 10 && (
          <p className="stat-card-footer">Star Volunteer ⭐</p>
        )}
      </div>

      {/* Top Pickup Location */}
      <div className="stat-card bg-green-gradient">
        <div className="stat-card-header">
          <p className="stat-card-title">Top Pickup Location</p>
          <MapPin className="stat-card-icon" />
        </div>
        <p className="stat-card-value">{topLocation}</p>
        <p className="stat-card-footer">{locationCounts[topLocation]} pickups</p>
      </div>

      {/* Completion Rate */}
      <div className="stat-card bg-purple-gradient">
        <div className="stat-card-header">
          <p className="stat-card-title">Completion Rate</p>
          <TrendingUp className="stat-card-icon" />
        </div>
        <p className="stat-card-value">{completionRate}%</p>
        <p className="stat-card-footer">{completedDeliveries} of {donorData.length} orders</p>
      </div>

      {/* Active Donations */}
      <div className="stat-card bg-orange-gradient">
        <div className="stat-card-header">
          <p className="stat-card-title">Active Donations</p>
          <Award className="stat-card-icon" />
        </div>
        <p className="stat-card-value">
          {donorData.filter(donor => donor.status !== 'Delivered').length}
        </p>
        <p className="stat-card-footer">Pending & In Progress</p>
      </div>
    </div>
  );
};

export default StatsCards;

