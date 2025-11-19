import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getThemeColors } from "../theme";

export default function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = getThemeColors(theme);

  return { theme, colors, toggleTheme };
}
