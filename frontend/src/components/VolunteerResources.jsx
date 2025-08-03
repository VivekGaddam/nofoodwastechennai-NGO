import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './VolunteerResources.css';

const VolunteerResources = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <motion.div 
      className="resources-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">
        <HelpCircle className="title-icon" />
        Volunteer Resources
      </h2>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index} 
            className="faq-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <button 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: openFAQ === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {openFAQ === index ? (
                  <ChevronDown className="faq-icon" />
                ) : (
                  <ChevronRight className="faq-icon" />
                )}
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openFAQ === index && (
                <motion.div 
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="contact-support"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="support-title">Need More Help?</h3>
        <p className="support-text">Contact our support team</p>
        <button className="btn-outline btn-small">
          Contact Support
        </button>
      </motion.div>
    </motion.div>
  );
};

export default VolunteerResources;
