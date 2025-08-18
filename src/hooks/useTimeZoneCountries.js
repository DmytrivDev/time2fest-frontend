// src/hooks/useTimeZoneCountries.ts
import { useQuery } from '@tanstack/react-query';
import { getValidLocale } from '@/utils/getValidLocale';
import { fetchCountriesByZone } from '@/utils/timezones';

export function useTimeZoneCountries(code) {
  const locale = getValidLocale();

  return useQuery({
    queryKey: ['tz-countries', code, locale],
    queryFn: () => fetchCountriesByZone(code, locale),
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
    // ⚠️ Уніфікуємо два можливі формати відповіді
    select: (raw) => {
      // ТВОЯ форма (як на скріні): [{ id, code, countries: [...] }]
      if (Array.isArray(raw)) {
        return raw[0]?.countries ?? [];
      }
      // Класичний Strapi REST: { data: [{ attributes: { countries: { data: [...] }}}]}
      if (raw?.data && Array.isArray(raw.data)) {
        return raw.data[0]?.attributes?.countries?.data ?? [];
      }
      return [];
    },
  });
}
