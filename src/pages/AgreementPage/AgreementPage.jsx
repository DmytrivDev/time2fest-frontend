import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';

import TextPage from '../../components/TextPage/TextPage';

const AgreementPage = () => {
  const locale = getValidLocale();
  const page = 'agreement'; // яка саме сторінка

  const { data, isLoading, error } = useQuery({
    queryKey: ['text-page', page, locale],
    queryFn: async () => {
      const res = await api.get(`/text?page=${page}&locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });


  return (
    <TextPage data={data?.TextComponent} isLoading={isLoading} error={error} />
  );
};

export default AgreementPage;
