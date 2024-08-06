'use client';
import React, { useState, useCallback } from 'react';
import Toast from './Toast';

let toastId = 0;

const ToastContext = React.createContext();

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, duration = 3000) => {
    const id = toastId++;
    setToasts((prevToasts) => [...prevToasts, { id, message, duration }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          onClose={() =>
            setToasts((prevToasts) =>
              prevToasts.filter((t) => t.id !== toast.id)
            )
          }
        />
      ))}
    </ToastContext.Provider>
  );
}
