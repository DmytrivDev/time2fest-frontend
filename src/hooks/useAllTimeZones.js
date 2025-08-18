// src/hooks/useAllTimeZones.js
import { useQuery } from '@tanstack/react-query';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';

export function useAllTimeZones() {
  const locale = getValidLocale();

  return useQuery({
    queryKey: ['all-time-zones', locale],
    queryFn: async () => {
      const res = await api.get('/time-zones', { params: { locale } }); // Nest: GET /time-zones?locale=xx
      return res.data; // «як є» зі Strapi/Nest
    },
    staleTime: 5 * 60 * 1000,
  });
}
