import { useAuth } from "@/src/hooks/useAuth";
import useTheme from "@/src/hooks/useTheme";
import { LanguageContext } from "@/src/i18n/LanguageProvider";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const router = useRouter();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, toggleTheme, colors } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
      }}
    >
      {/* Language */}
      <Text style={{ color: colors.text, fontSize: 20, marginBottom: 10 }}>
        {t("change_language")}
      </Text>

      <TouchableOpacity
        onPress={() => setLanguage("en")}
        style={{
          padding: 14,
          backgroundColor: language === "en" ? colors.primary : colors.surface,
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: colors.text }}>{t("language_english")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setLanguage("hi")}
        style={{
          padding: 14,
          backgroundColor: language === "hi" ? colors.primary : colors.surface,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: colors.text }}>{t("language_hindi")}</Text>
      </TouchableOpacity>

      {/* Theme */}
      <View style={{ height: 30 }} />

      <Text style={{ color: colors.text, fontSize: 20, marginBottom: 10 }}>
        Theme
      </Text>

      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          padding: 14,
          backgroundColor: colors.surface,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: colors.text }}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <View style={{ height: 40 }} />

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          padding: 14,
          backgroundColor: "red",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>{t("logout")}</Text>
      </TouchableOpacity>
    </View>
  );
}
