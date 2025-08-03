import React, { useState } from 'react';
import { CheckCircle, MapPin, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './VolunteerTasks.css';

const VolunteerTasks = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks ?? []);

  const handleAcceptTask = (taskId) => {
    const updated = taskList.map((task) =>
      task._id === taskId ? { ...task, status: 'accepted' } : task
    );
    setTaskList(updated);
  };

  const handleCompleteTask = (taskId) => {
    const updated = taskList.map((task) =>
      task._id === taskId ? { ...task, status: 'completed' } : task
    );
    setTaskList(updated);
  };

  if (!taskList || taskList.length === 0) {
    return (
      <motion.div 
        className="volunteer-tasks-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-title">Available Tasks</h2>
        <p className="empty-state">No tasks assigned yet.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="volunteer-tasks-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">Available Tasks</h2>
      <div className="tasks-grid">
        <AnimatePresence>
          {taskList.map((task, index) => {
            const isActive = task.status === 'pending' || task.status === 'accepted';
            const [lng, lat] = task.location?.coordinates ?? [];

            return (
              <motion.div
                key={task._id}
                className="task-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <div className="task-header">
                  <h3 className="task-food">{task.foodDescription}</h3>
                  <span className={`task-status task-status-${task.status}`}>
                    {task.status}
                  </span>
                </div>
                
                <div className="task-details">
                  <div className="task-detail">
                    <Phone className="task-icon" />
                    <span>{task.donorName} - {task.donorPhone}</span>
                  </div>
                  
                  <div className="task-detail">
                    <MapPin className="task-icon" />
                    <span>{task.pickupAddress}</span>
                  </div>
                  
                  <div className="task-detail">
                    <Clock className="task-icon" />
                    <span>Pickup: {new Date(task.preferredPickupTime).toLocaleString()}</span>
                  </div>
                  
                  <div className="task-quantity">
                    Serves: {task.quantity} people
                  </div>
                </div>
                
                <div className="task-actions">
                  {isActive ? (
                    <div className="action-buttons">
                      {lat && lng && (
                        <motion.a
                          href={`https://www.google.com/maps?q=${lat},${lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline btn-small"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MapPin className="btn-icon" />
                          View Map
                        </motion.a>
                      )}
                      
                      {task.status === 'pending' && (
                        <motion.button 
                          className="btn-primary btn-small"
                          onClick={() => handleAcceptTask(task._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Accept Task
                        </motion.button>
                      )}
                      
                      {task.status === 'accepted' && (
                        <motion.button 
                          className="btn-secondary btn-small"
                          onClick={() => handleCompleteTask(task._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CheckCircle className="btn-icon" />
                          Mark Complete
                        </motion.button>
                      )}
                    </div>
                  ) : (
                    <span className="task-completed">✓ Completed</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VolunteerTasks;
