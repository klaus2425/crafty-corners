import { createContext, useState } from "react"

export const ThemeContext = createContext();

export const ThemeProvider = () => {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((current) => (currrent === 'light' ? 'dark' : 'light'));
  }
}

export const useThemeContext = () => useThemeContext(ThemeContext);
