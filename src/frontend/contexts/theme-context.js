import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const getThemeFromLocalStorage = () => {
    if (localStorage.getItem("theme")) {
      return JSON.parse(localStorage.getItem("theme"));
    }
    return "light";
  };

  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
