import i18next, { Module } from "i18next";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, DEFAULT_NS } from "./constant";
import { Locales } from "./locales";

const languageDetector = {
  type: "languageDetector",
  detect: () => {
    let initialLanguage = DEFAULT_LANGUAGE;

    return initialLanguage;
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next.on("languageChanged", (lng) => {});

i18next.on("initialized", (options) => {
  if (options.lng == null) {
    return;
  }
});

i18next
  .use(languageDetector as Module)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    ns: Object.keys(Locales.fr),
    defaultNS: DEFAULT_NS,
    resources: Locales,
  });
