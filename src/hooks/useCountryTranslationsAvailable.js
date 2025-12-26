import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useCountryTranslationsAvailable = ({ slug, timezone }) => {
  const query = useQuery({
    queryKey: ['translations', slug, timezone],
    queryFn: async () => {
      const res = await api.get(
        `/translations?country=${slug}&zone=${timezone}`
      );

      const items = res?.data?.items;

      return Array.isArray(items) && items.length > 0;
    },
    enabled: Boolean(slug && timezone),
  });

  return {
    hasTranslations: query.data || false,
    isLoading: query.isLoading,
    error: query.error,
  };
};
