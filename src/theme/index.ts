export type ThemeColors = {
  background: string;
  text: string;
  surface: string;
  subtext: string;
  primary: string;
  card: string;
  border: string;
};

export const Themes: Record<"light" | "dark", ThemeColors> = {
  light: {
    background: "#FFFFFF",
    text: "#000000",
    surface: "#F4F4F4",
    subtext: "#666666",
    primary: "#0A84FF",
    card: "#FFFFFF",
    border: "#E0E0E0",
  },

  dark: {
    background: "#000000",
    text: "#FFFFFF",
    surface: "#1C1C1E",
    subtext: "#AAAAAA",
    primary: "#0A84FF",
    card: "#1C1C1E",
    border: "#333333",
  },
};

export const getThemeColors = (theme: "light" | "dark"): ThemeColors => {
  return Themes[theme];
};
