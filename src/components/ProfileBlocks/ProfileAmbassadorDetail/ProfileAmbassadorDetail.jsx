import { useParams, useSearchParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { api } from '@/utils/api';
import clsx from 'clsx';

import AmbassadorDetail from '../../AmbassadorDetail/AmbassadorDetail';
import AmbassadorsRand from '../../AmbassadorsRand/AmbassadorsRand';

import styles from './ProfileAmbassadorDetail.module.scss';

const CountryPage = () => {
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

  // 🔹 Передаємо дані амбасадора у Layout для SeoMeta
  useEffect(() => {
    if (ambassadorData?.name) {
      setDynamicData?.(ambassadorData);
    }
  }, [ambassadorData?.name, setDynamicData]);

  const excludeId = ambassadorData?.id || null;

  return (
    <div className={clsx(styles.profileContent, 'profileNoCont')}>
      <AmbassadorDetail
        key={slug}
        data={ambassadorData}
        isLoading={isLoading}
        error={error}
      />

      <AmbassadorsRand exclude={excludeId} lang={locale} />
    </div>
  );
};

export default CountryPage;
