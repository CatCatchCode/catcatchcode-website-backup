import { createContext, useContext, useState, useEffect } from 'react';

const FocusContext = createContext();

export const useFocus = () => useContext(FocusContext);

export const FocusProvider = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(() => {
    const saved = localStorage.getItem('focusMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('focusMode', isFocusMode);
    if (isFocusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  }, [isFocusMode]);

  const toggleFocusMode = () => {
    setIsFocusMode((prev) => !prev);
  };

  return (
    <FocusContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
    </FocusContext.Provider>
  );
};
