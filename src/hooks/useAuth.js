import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/utils/userApi';

export const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await userApi.get('/auth/me');
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 10 хв
    retry: false,
  });

  const isAuthenticated = !!data;
  const isPremium = Boolean(data?.isPremium);

  return {
    user: data || null,
    isAuthenticated,
    isPremium,
    isLoading,
    error,
  };
};
