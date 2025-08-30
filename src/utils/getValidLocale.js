// utils/getValidLocale.ts
import i18n from '@/i18n';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@/i18n/languages';

export function getValidLocale() {
  return SUPPORTED_LANGS.includes(i18n.language) ? i18n.language : DEFAULT_LANG;
}