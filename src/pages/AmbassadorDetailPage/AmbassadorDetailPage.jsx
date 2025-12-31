import { useParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { api } from '@/utils/api';

import AmbassadorDetail from '../../components/AmbassadorDetail/AmbassadorDetail';
import CountryLiveList from '../../components/CountryLiveList/CountryLiveList';
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
      const ambassador = Array.isArray(res.data.items)
        ? res.data.items.find(amb => amb.slug === slug)
        : res.data?.data?.items.find(amb => amb.slug === slug);

      return ambassador || null;
    },
    enabled: !!slug,
  });

  console.log(slug)

  // --- Запит на дані країни ---
  const {
    data: liveData,
    isLoading: liveLoading,
    error: liveError,
  } = useQuery({
    queryKey: ['live-streams', slug, locale],
    queryFn: async () => {
      const res = await api.get(`/live-streams?ambassador=${slug}`);
      return res?.data?.items || [];
    },
    enabled: !!slug,

    // 🔑 КРИТИЧНО ДЛЯ LIVE
    refetchInterval: 5000,
    staleTime: 0, // завжди вважати застарілими
  });

  // 🔹 Передаємо дані амбасадора у Layout для SeoMeta
  useEffect(() => {
    if (ambassadorData?.name) {
      setDynamicData?.(ambassadorData);
    }
  }, [ambassadorData?.name, setDynamicData]);

  const excludeId = ambassadorData?.id || null;
  const dataCtr = [ambassadorData?.country];

  return (
    <>
      <AmbassadorDetail
        key={slug}
        data={ambassadorData}
        isLoading={isLoading}
        error={error}
      />
      
      {liveData && liveData.length > 0 && (
        <CountryLiveList
          data={dataCtr}
          dataItems={liveData}
          isLoading={liveLoading}
          error={liveError}
        />
      )}

      <AmbassadorsRand exclude={excludeId} lang={locale} />

      <BecomeSection />
    </>
  );
};

export default AmbassadorDetailPage;
