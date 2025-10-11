// src/utils/timezones.ts
import { api } from '@/utils/api';

export async function fetchCountriesByZone(code, locale) {
  // кодуємо "UTC+2" -> "UTC%2B2"
  const safe = encodeURIComponent(code);
  const res = await api.get(`/time-zone/${safe}/countries?locale=${locale}`);
  console.log(res)
  return res.data; // віддаємо як є (без перевірок полів)
}