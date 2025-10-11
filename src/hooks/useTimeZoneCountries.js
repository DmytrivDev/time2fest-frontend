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
      if (Array.isArray(raw)) {
        return raw ?? [];
      }
      // Класичний Strapi REST: { data: [{ attributes: { countries: { data: [...] }}}]}
      if (raw && Array.isArray(raw)) {
        return raw?.data ?? [];
      }
      return [];
    },
  });
}
