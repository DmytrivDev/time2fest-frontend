import { useQuery } from '@tanstack/react-query';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';

export function useCountryByCode(code) {
  const locale = getValidLocale();

  return useQuery({
    queryKey: ['country-by-code', code, locale],
    queryFn: async () => {
      const res = await api.get('/countries', { params: { code, locale } });
      return res.data; // повертаємо «як є»
    },
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
  });
}