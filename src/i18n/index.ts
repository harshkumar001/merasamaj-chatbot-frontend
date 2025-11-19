import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./languages/en.json";
import hi from "./languages/hi.json";

export const initI18n = async (langOverride?: string) => {
  // Safely detect device language
  const deviceLang = Localization?.locale?.split("-")[0] ?? "en";

  const lng = langOverride ?? deviceLang;

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};
