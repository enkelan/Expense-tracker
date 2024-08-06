import React, { useEffect, useState } from 'react';

function Toast({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 2000); // Duration of the pop-down animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-black text-white p-3 rounded-md shadow-lg animate-pop-up ${
        !visible ? 'animate-pop-down' : ''
      }`}
      style={{ zIndex: 1000 }}>
      {message}
    </div>
  );
}

export default Toast;
