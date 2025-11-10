import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/common.json';
import uk from './locales/uk/common.json';
import es from './locales/es/common.json';
import fr from './locales/fr/common.json';

const SUPPORTED_LANGS = ['en', 'uk', 'es', 'fr'];
const DEFAULT_LANG = 'en';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      uk: { common: uk },
      es: { common: es },
      fr: { common: fr },
    },
    fallbackLng: DEFAULT_LANG,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },

    // 🟢 ключові налаштування
    supportedLngs: SUPPORTED_LANGS,
    nonExplicitSupportedLngs: true,

    detection: {
      // порядок визначення мови
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18nextLng',
      lookupLocalStorage: 'i18nextLng',

      // 🔥 нормалізує будь-які регіональні варіанти (en-GB → en)
      convertDetectedLanguage: lng => {
        if (!lng) return DEFAULT_LANG;
        const base = lng.split('-')[0].toLowerCase();
        return SUPPORTED_LANGS.includes(base) ? base : DEFAULT_LANG;
      },
    },
  });

// 💡 важливо: після ініціалізації гарантуємо, що i18n.language — лише базова форма
const base = i18n.language?.split('-')[0];
if (base && base !== i18n.language) {
  i18n.changeLanguage(base);
}

export default i18n;
