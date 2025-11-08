export const DEFAULT_LANG = 'en';

export const LANGS = [
  { code: 'en', label: 'English', nativeCode: 'EN' },
  { code: 'uk', label: 'Українська', nativeCode: 'УК' },
  { code: 'es', label: 'Español', nativeCode: 'ES' },
  { code: 'fr', label: 'Français', nativeCode: 'FR' },
];

export const SUPPORTED_LANGS = LANGS.map(l => l.code);
