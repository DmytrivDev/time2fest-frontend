import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

import AmbassadorDetail from '../../components/AmbassadorDetail/AmbassadorDetail';
import AmbassadorsRand from '../../components/AmbassadorsRand/AmbassadorsRand';
import BecomeSection from '../../components/BecomeSection/BecomeSection';

const AmbassadorDetailPage = () => {
  const { slug, lang } = useParams();
  const locale = lang || 'en';

  // ---- Запит до API для конкретного амбасадора ----
  const {
    data: ambassadorData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ambassador-detail', slug, locale],
    queryFn: async () => {
      const res = await api.get(`/ambassadors-list?locale=${locale}&full=true`);

      // 🔍 Знаходимо потрібного амбасадора по slug
      const ambassador = Array.isArray(res.data)
        ? res.data.find(amb => amb.slug === slug)
        : res.data?.data?.find(amb => amb.slug === slug);

      return ambassador || null;
    },
    enabled: !!slug, // Запит тільки якщо є slug
  });

  const excludeId = ambassadorData?.id || null;

  return (
    <>
      <AmbassadorDetail
        data={ambassadorData}
        isLoading={isLoading}
        error={error}
      />

      <AmbassadorsRand exclude={excludeId} lang={locale} />

      <BecomeSection />
    </>
  );
};

export default AmbassadorDetailPage;
