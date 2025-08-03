import React from 'react';
import { MapPin, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import './DonorTable.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'status-pending';
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
            {data.map((donor, index) => (
              <motion.tr 
                key={donor.id} 
                className="table-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <td className="table-cell">
                  <div className="donor-name">{donor.name}</div>
                </td>
                <td className="table-cell">
                  <span className={`status-badge ${getStatusColor(donor.status)}`}>
                    {donor.status}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="location-cell">
                    <MapPin className="location-icon" />
                    {donor.location}
                  </div>
                </td>
                <td className="table-cell">{donor.food}</td>
                <td className="table-cell">{donor.quantity}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
