'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { ToastMessage } from '@/components/toast/ToastMessage';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const timersReference = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));

    if (timersReference.current.has(id)) {
      clearTimeout(timersReference.current.get(id));
      timersReference.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType, duration: number = 5000) => {
      const id = crypto.randomUUID(); // Generate a unique ID for the toast

      setToasts(prev => [...prev, { id, message, type }]);

      if (duration > 0) {
        const timerId = setTimeout(() => removeToast(id), duration);

        timersReference.current.set(id, timerId);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastMessage
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
