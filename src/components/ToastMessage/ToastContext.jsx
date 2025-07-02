import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastQueue, setToastQueue] = useState([]);
  const [currentToast, setCurrentToast] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback((message, duration = 4000) => {
    const id = Math.random().toString(36).substring(2);
    const toast = { id, message, duration };

    setToastQueue((prev) => [...prev, toast]);
  }, []);

  const removeCurrentToast = useCallback(() => {
    setCurrentToast(null);
  }, []);

  useEffect(() => {
    if (!currentToast && toastQueue.length > 0) {
      const [nextToast, ...rest] = toastQueue;
      setCurrentToast(nextToast);
      setToastQueue(rest);

      timeoutRef.current = setTimeout(() => {
        setCurrentToast(null);
      }, nextToast.duration);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentToast, toastQueue]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        currentToast && (
          <div
            className={clsx({
              'toast-message': true,
            })}
          >
            <div>{currentToast.message}</div>

            <span
              onClick={removeCurrentToast}
              role="button"
              tabIndex={0}
            >
              &times;
            </span>
          </div>
        ),
        document.body
      )}
    </ToastContext.Provider>
  );
};
