// src/services/getPathByLang.ts
export function getPathByLang(lang: string, path: string) {
  return lang === 'en' ? path : `/${lang}${path}`;
}