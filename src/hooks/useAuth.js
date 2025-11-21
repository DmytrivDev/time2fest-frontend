import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/utils/userApi';

export const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await userApi.get('/auth/me'); // або '/me'
      return res.data;
    },
    retry: false, // важливо! не треба робити 3 спроби
  });

  return {
    user: data || null,
    isAuthenticated: !!data,
    isLoading,
    error,
  };
};