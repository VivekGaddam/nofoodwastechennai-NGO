import React from 'react';
import { MapPin, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import './DonorTable.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'status-pending';
    case 'accepted':
    case 'In Progress':
      return 'status-warning';
    case 'completed':
      return 'status-completed';
    default:
      return 'status-default';
  }
};

export default function DonorTable({ data }) {
  return (
    <motion.div 
      className="donortable-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="donortable-header">
        <h3 className="donortable-title">
          <Package className="title-icon" />
          Food Donations
        </h3>
      </div>
      <div className="donortable-wrapper">
        <table className="data-table">
          <thead className="table-head">
            <tr>
              <th className="table-header-cell">Donor Name</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Location</th>
              <th className="table-header-cell">Food Type</th>
              <th className="table-header-cell">Quantity</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data.map((donation, index) => {
              const [lng, lat] = donation.location?.coordinates ?? [];
              return (
                <motion.tr 
                  key={donation._id} 
                  className="table-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <td className="table-cell">
                    <div className="donor-name">{donation.donorName}</div>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="location-cell">
                      <MapPin className="location-icon" />
                      {lat && lng ? (
                        <a
                          href={`https://www.google.com/maps?q=${lat},${lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="location-link"
                        >
                          {donation.pickupAddress}
                        </a>
                      ) : (
                        donation.pickupAddress
                      )}
                    </div>
                  </td>
                  <td className="table-cell">{donation.foodDescription}</td>
                  <td className="table-cell">{donation.quantity}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
