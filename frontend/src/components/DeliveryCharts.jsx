import React from 'react';
import { TrendingUp, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import "./DeliveryCharts.css"

const DeliveryCharts = ({ monthlyData, weeklyData, foodTypeData }) => {
  return (
    <div className="charts-container">
      <h2 className="section-title">Delivery Analytics</h2>
      <div className="charts-grid">
        
        {/* Monthly Chart */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="chart-header">
            <TrendingUp className="chart-icon" />
            <h3 className="chart-title">Monthly Deliveries</h3>
          </div>
          <div className="chart-content">
            {monthlyData.map((item, index) => (
              <motion.div 
                key={index} 
                className="chart-bar"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="bar-label">{item.month}</div>
                <div className="bar-container">
                  <motion.div 
                    className="bar-fill"
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.deliveries / 70) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  ></motion.div>
                </div>
                <div className="bar-value">{item.deliveries}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="chart-header">
            <Calendar className="chart-icon" />
            <h3 className="chart-title">Weekly Deliveries</h3>
          </div>
          <div className="chart-content">
            {weeklyData.map((item, index) => (
              <motion.div 
                key={index} 
                className="chart-bar"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="bar-label">{item.day}</div>
                <div className="bar-container">
                  <motion.div 
                    className="bar-fill"
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.deliveries / 20) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  ></motion.div>
                </div>
                <div className="bar-value">{item.deliveries}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Food Type Distribution */}
        <motion.div 
          className="chart-card chart-full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="chart-header">
            <PieChartIcon className="chart-icon" />
            <h3 className="chart-title">Food Type Distribution</h3>
          </div>
          <div className="food-type-content">
            {foodTypeData.map((item, index) => (
              <motion.div 
                key={index} 
                className="food-type-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="food-type-info">
                  <span className="food-type-label">{item.type}</span>
                  <span className="food-type-count">{item.count} donations</span>
                </div>
                <div className="food-type-bar">
                  <motion.div 
                    className="food-type-progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  ></motion.div>
                </div>
                <span className="food-type-percentage">{item.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DeliveryCharts;