import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { initI18n } from "./index";

export type AppLanguage = "en" | "hi";

interface LanguageContextProps {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLang] = useState<AppLanguage>("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupLanguage = async () => {
      // Check if previously saved
      const saved = await AsyncStorage.getItem("APP_LANGUAGE");

      const lang: AppLanguage = (saved as AppLanguage) || "en";

      // Initialize i18n with saved or fallback language
      await initI18n(lang);

      i18n.changeLanguage(lang);
      setLang(lang);
      setLoading(false);
    };

    setupLanguage();
  }, []);

  const setLanguage = async (lang: AppLanguage) => {
    setLang(lang);
    await AsyncStorage.setItem("APP_LANGUAGE", lang);
    i18n.changeLanguage(lang);
  };

  if (loading) return null; // prevents i18next warning

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
