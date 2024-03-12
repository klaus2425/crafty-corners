import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark-theme');
  
  setTheme(localStorage.getItem('THEME'))

  const [isDarkMode, setDarkMode] = useState(true);
  const toggleTheme = () => {
    setTheme((current) => {
      localStorage.setItem('THEME', current);
      return (current === 'light-theme' ? 'dark-theme' : 'light-theme')
    });
    setDarkMode(!isDarkMode);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}



export const useThemeContext = () => useContext(ThemeContext);