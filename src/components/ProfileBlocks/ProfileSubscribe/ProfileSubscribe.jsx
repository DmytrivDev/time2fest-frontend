import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { getValidLocale } from '@/utils/getValidLocale';
import { lockScroll, unlockScroll } from '../../../utils/lockScroll';
import { api } from '@/utils/api';
import clsx from 'clsx';

import ZonesAside from '../../common/ZonesAside';
import AmbassadorsGrid from '../../AmbassadorsList/AmbassadorsGrid';
import Pagination from '../../common/Pagination';

import styles from './ProfileSubscribe.module.scss';

export default function ProfileSubscribe() {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const location = useLocation();

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
              <span className='loading'></span>
              <span className='loading'></span>
            </div>
          </div>
          <div className={clsx(styles.price, styles.priceLoading, 'loading')}></div>
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
          <button className={clsx('btn_primary', 'loading', styles.btnLoading)}></button>
        </div>
      </div>
    );
  }

  if (errorRest || !restData) return null;

  const data = restData?.PaidPlan;

  return (
    <div className={styles.profileContent}>
      <div className={styles.heading}>
        <div>
          <h1>Підписка для тих, хто хоче більше</h1>
          <p>
            Зі святковою підпискою ви відкриєте доступ до унікальних трансляцій
            від амбасадорів Time2Fest. Це люди з різних країн, які покажуть вам
            атмосферу святкування в реальному часі.
          </p>
        </div>
        <div className={styles.price}>{data.Price}</div>
      </div>

      <ul className={styles.cards}>
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
        <button className="btn_primary">{t('btn_sub')}</button>
      </div>
    </div>
  );
}
