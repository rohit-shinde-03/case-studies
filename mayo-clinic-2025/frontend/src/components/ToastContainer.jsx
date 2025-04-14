import React, { useState, useEffect, useCallback } from 'react';
import Toast from './Toast';

let toastCounter = 0;

// Create a global toast event system
export const toast = {
  success: (message, duration) => {
    dispatchToastEvent({ message, type: 'success', duration });
  },
  error: (message, duration) => {
    dispatchToastEvent({ message, type: 'error', duration });
  },
  warning: (message, duration) => {
    dispatchToastEvent({ message, type: 'warning', duration });
  },
  info: (message, duration) => {
    dispatchToastEvent({ message, type: 'info', duration });
  }
};

// Create a custom event to communicate with the ToastContainer
const dispatchToastEvent = (toastData) => {
  const event = new CustomEvent('toast-notification', { 
    detail: { ...toastData, id: toastCounter++ } 
  });
  window.dispatchEvent(event);
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toastData) => {
    setToasts(prevToasts => [...prevToasts, toastData]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  useEffect(() => {
    const handleToastEvent = (event) => {
      addToast(event.detail);
    };

    window.addEventListener('toast-notification', handleToastEvent);
    
    return () => {
      window.removeEventListener('toast-notification', handleToastEvent);
    };
  }, [addToast]);

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;