import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useCountryLiveAvailable = ({ slug, timezone }) => {
  const query = useQuery({
    queryKey: ['live-streams', slug, timezone],
    queryFn: async () => {
      const res = await api.get(
        `/live-streams?country=${slug}&timeZone=${timezone}`
      );

      const items = res?.data?.items;

      return Array.isArray(items) && items.length > 0;
    },
    enabled: Boolean(slug && timezone),
  });

  return {
    hasLive: query.data || false,
    isLoading: query.isLoading,
    error: query.error,
  };
};
