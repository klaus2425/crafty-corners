import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark-theme');

  const toggleTheme = () => {
    setTheme((current) => (current === 'light-theme' ? 'dark-theme' : 'light-theme'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext);