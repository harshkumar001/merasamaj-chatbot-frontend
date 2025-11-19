import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem("APP_THEME");
        if (saved === "light" || saved === "dark") {
          setTheme(saved);
        }
      } catch (e) {
        console.log("Theme load error:", e);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      await AsyncStorage.setItem("APP_THEME", newTheme);
    } catch (e) {
      console.log("Theme save error:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
