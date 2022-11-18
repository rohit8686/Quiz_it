import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (arg: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);
const useTheme = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

export const getThemeFromLocalStorage = (): string => {
  if (localStorage.getItem("theme") !== null) {
    return JSON.parse(localStorage.getItem("theme") || "");
  }
  return "light";
};

const ThemeProvider = ({ children }: Props) => {
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
