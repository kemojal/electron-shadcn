import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        appName: "buddy",
        titleHomePage: "Home",
        titleSecondPage: "Second",
      },
    },
    "pt-BR": {
      translation: {
        appName: "buddy",
        titleHomePage: "Página Inicial",
        titleSecondPage: "Segunda Página",
      },
    },
  },
});
