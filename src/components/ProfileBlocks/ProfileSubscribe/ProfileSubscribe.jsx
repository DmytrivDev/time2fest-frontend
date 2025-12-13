import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import { usePremiumCheckout } from '@/hooks/usePremiumCheckout';
import clsx from 'clsx';

import styles from './ProfileSubscribe.module.scss';

export default function ProfileSubscribe() {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const { startCheckout, loading } = usePremiumCheckout();

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

  if (isLoadingRest) {
    return (
      <div className={styles.profileContent}>
        <div className={styles.heading}>
          <div>
            <div className={clsx(styles.titleLoading, 'loading')}></div>
            <div className={clsx(styles.descLoading)}>
              <span className="loading"></span>
              <span className="loading"></span>
            </div>
          </div>
          <div
            className={clsx(styles.price, styles.priceLoading, 'loading')}
          ></div>
        </div>

        <ul className={styles.cards}>
          {Array.from({ length: 3 }).map((_, i) => (
            <li
              key={i}
              className={clsx(styles.card, styles.loadingCard, 'loading')}
            ></li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            className={clsx('btn_primary', 'loading', styles.btnLoading)}
          ></button>
        </div>
      </div>
    );
  }

  if (errorRest || !restData) return null;

  const data = restData?.PaidPlan;
  const count = data.PaidPlanList.length;

  return (
    <div className={styles.profileContent}>
      <div className={styles.heading}>
        <div>
          <h1>{t('profile.subTtl')}</h1>
          <p>{t('profile.subTxt')}</p>
        </div>
        <p className={styles.price}>{data.Price}</p>
      </div>

      <ul className={clsx(styles.cards, count === 1 && styles.oneItem)}>
        {data.PaidPlanList?.map(item => {
          return (
            <li key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {item.Image?.url && (
                  <img
                    src={`${import.meta.env.VITE_STRIPE_URL}${item.Image.url}`}
                    alt={item.Image?.alternativeText || item.Text}
                  />
                )}
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardText}>{item.Text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.actions}>
        <button className="btn_primary" onClick={startCheckout}>
          {t('btn_sub')}
        </button>
      </div>
    </div>
  );
}
