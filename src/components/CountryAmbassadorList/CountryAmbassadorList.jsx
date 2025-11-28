import React from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { api } from '@/utils/api';

import AmbassadorFullItem from '../common/AmbassadorFullItem';

import styles from './CountryAmbassadorList.module.scss';

const CountryAmbassadorList = React.memo(
  ({
    data,
    name,
    sec,
    code,
    isLoading,
    error,
    exclude,
    lang,
    isProfilePage,
  }) => {
    const { t, i18n } = useTranslation();
    const locale = lang || i18n.language || 'en';

    // --- Якщо дані з CountryPage не передані, тягнемо самостійно ---
    const shouldFetch = !data && !isLoading && !error;

    const {
      data: randomData,
      isLoading: isLoadingRand,
      error: errorRand,
    } = useQuery({
      queryKey: ['ambassadors-random', locale, exclude],
      queryFn: async () => {
        const params = new URLSearchParams({
          locale,
          rand: 'true',
          count: '4',
        });
        if (exclude) params.append('exclude', exclude.toString());

        const res = await api.get(`/ambassadors-list?${params.toString()}`);
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
      },
      enabled: shouldFetch,
    });

    // --- Визначаємо фінальні дані ---
    const ambData = data || randomData || [];
    const ambLoading = isLoading || isLoadingRand;
    const ambError = error || errorRand;

    // --- Стан завантаження ---
    if (ambLoading) {
      return (
        <section
          className={clsx(styles.section, isProfilePage && styles.profilePage)}
        >
          <div className="container">
            <div className={styles.header}>
              <div
                className={clsx(styles.title, styles.titleLoading, 'loading')}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.grid}>
                {Array.from({ length: 1 }).map((_, i) => (
                  <AmbassadorFullItem key={i} isLoading />
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // --- Якщо помилка або немає амбасадорів ---
    if (ambError || !ambData?.length) return null;

    return (
      <section
        className={clsx(styles.section, isProfilePage && styles.profilePage)}
      >
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>
              {t('ambassadors.nye_ambass')} {sec || name}
            </h2>
          </div>
          <div className={styles.content}>
            <div className={styles.grid}>
              {ambData.map(amb => (
                <AmbassadorFullItem
                  key={amb.id}
                  data={amb}
                  nameProp={name}
                  codeProp={code}
                  isProfilePage={isProfilePage}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default CountryAmbassadorList;
