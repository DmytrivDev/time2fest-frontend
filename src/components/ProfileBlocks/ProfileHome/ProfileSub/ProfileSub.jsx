import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import clsx from 'clsx';

import styles from './ProfileSub.module.scss';

export default function ProfilePayments() {
  const { t, i18n } = useTranslation();
  const locale = getValidLocale();

  const {
    data: restData,
    isLoading: isLoadingRest,
    error: errorRest,
  } = useQuery({
    queryKey: ['about-page-rest', locale],
    queryFn: async () => {
      const res = await api.get(`/about-page-rest?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (errorRest || !restData) return null;

  const data = restData?.PaidPlan;

  return (
    <section className={styles.profileSub}>
      <div className={styles.subscribe}>
        <div className={styles.subscribeLeft}>
          <h3 className={styles.sebTitle}>Хочете отримати весь контент?</h3>
          <div className={styles.subText}>
            <p>
              Підпишіться і святкуйте разом із нами — усі Нові роки світу в
              одному місці!
            </p>
          </div>
        </div>
        <Link
          to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}profile/subscription`}
          className={clsx(styles.srbscribeBtn, 'btn_primary')}
        >
          {data.Price}
        </Link>
      </div>
    </section>
  );
}
