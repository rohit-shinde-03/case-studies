import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Allow time for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`toast toast-${type}`} 
      style={{ animation: isVisible ? 'slideIn 0.3s ease-out forwards' : 'fadeOut 0.3s ease-out forwards' }}
    >
      <span>{message}</span>
      <button className="toast-close" onClick={() => setIsVisible(false)}>×</button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

export default Toast;