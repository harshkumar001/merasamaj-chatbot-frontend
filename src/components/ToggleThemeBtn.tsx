import { Button } from "react-native";
import useTheme from "../hooks/useTheme";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
      onPress={toggleTheme}
    />
  );
}
