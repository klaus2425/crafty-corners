import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light-theme');
  const [isDarkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    localStorage.getItem('THEME') !== null && setTheme(localStorage.getItem('THEME'))
    localStorage.getItem('THEME') !== 'dark-theme' && setDarkMode(false);
  }, [theme])
  const toggleTheme = () => {
    setTheme((current) => {
      localStorage.setItem('THEME', current === 'light-theme' ? 'dark-theme' : 'light-theme');
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