import { useParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { api } from '@/utils/api';

import AmbassadorDetail from '../../components/AmbassadorDetail/AmbassadorDetail';
import AmbassadorsRand from '../../components/AmbassadorsRand/AmbassadorsRand';
import BecomeSection from '../../components/BecomeSection/BecomeSection';

const AmbassadorDetailPage = () => {
  const { slug, lang } = useParams();
  const locale = lang || 'en';

  // 🔹 Отримуємо функцію для передачі даних у Layout
  const { setDynamicData } = useOutletContext();

  // ---- Запит до API для конкретного амбасадора ----
  const {
    data: ambassadorData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ambassador-detail', slug, locale],
    queryFn: async () => {
      const res = await api.get(`/ambassadors-list?locale=${locale}&full=true`);
      const ambassador = Array.isArray(res.data)
        ? res.data.find(amb => amb.slug === slug)
        : res.data?.data?.find(amb => amb.slug === slug);

      return ambassador || null;
    },
    enabled: !!slug,
  });

  // 🔹 Передаємо дані амбасадора у Layout для SeoMeta
  useEffect(() => {
    if (ambassadorData?.name) {
      setDynamicData?.(ambassadorData);
    }
  }, [ambassadorData?.name, setDynamicData]);

  const excludeId = ambassadorData?.id || null;

  console.log(excludeId)

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
