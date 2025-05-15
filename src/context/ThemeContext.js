import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [themeReady, setThemeReady] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      console.log("Toggling theme to:", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    setThemeReady(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeReady }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
