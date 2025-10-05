import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useAfterLoad } from '@/hooks/useAfterLoad';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';

import AmbassadorsAside from './AmbassadorsAside';
import AmbassadorsGrid from './AmbassadorsGrid';

import styles from './AmbassadorsList.module.scss';

const AmbassadorsList = () => {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const pageLoaded = useAfterLoad();

  // 🔥 Запит до бекенду
  const { data, isLoading, error } = useQuery({
    queryKey: ['ambassadors-list', locale],
    queryFn: async () => {
      const res = await api.get(`/ambassadors-list?locale=${locale}`);
      return res.data;
    },
    enabled: pageLoaded,
    staleTime: 5 * 60 * 1000,
  });

  console.log(data)

  // ⏩ Контейнер лише передає все далі
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <AmbassadorsAside isLoading={isLoading} error={error} data={data} />
          <AmbassadorsGrid isLoading={isLoading} error={error} data={data} />
        </div>
      </div>
    </section>
  );
};

export default AmbassadorsList;
