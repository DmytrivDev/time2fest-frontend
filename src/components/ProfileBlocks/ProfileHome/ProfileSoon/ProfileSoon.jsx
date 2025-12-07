import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getValidLocale } from '@/utils/getValidLocale';
import { useLocation, Link } from 'react-router-dom';
import { api } from '@/utils/api';
import clsx from 'clsx';

import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import CountryItem from '../../../common/CountryItem';

import styles from './ProfileSoon.module.scss';

export default function ProfileSoon() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const locale = getValidLocale();

  // ---- 1. Завантажуємо часові зони ----
  const {
    data: zonesData = [],
    isLoading: zonesLoading,
    error,
  } = useQuery({
    queryKey: ['time-zones', locale],
    queryFn: async () => {
      const res = await api.get(`/time-zones?locale=${locale}`);
      return res.data || [];
    },
  });

  const now = new Date();

  // ---- 2. Обчислюємо момент НР ----
  const withNY = (zonesData || []).map(zone => {
    const utcStr = zone.code || zone.zone;
    const ny = getNextNYLocalForUtcOffset(utcStr, { reference: now });
    return {
      ...zone,
      utcStr,
      nyInstant: ny.instant,
      nyLocal: ny.display,
      hasPassed: now >= ny.instant,
      diffMs: ny.instant - now,
    };
  });

  // ---- 3. Фільтр лише майбутніх ----
  const upcoming = withNY.filter(z => !z.hasPassed);

  // ---- 4. Найближча ----
  const nextZone =
    upcoming.length > 0
      ? upcoming.reduce((a, b) => (a.diffMs < b.diffMs ? a : b))
      : null;

  // ---- 5. Завантажуємо країни ----
  const {
    data: countriesData,
    isLoading: countriesLoading,
    error: countriesError,
  } = useQuery({
    enabled: !!nextZone,
    queryKey: ['countries', locale, nextZone?.utcStr],
    queryFn: async () => {
      const limit = 24;
      const url = `/countries?locale=${locale}&tz=${encodeURIComponent(
        nextZone.utcStr
      )}&page=1&limit=${limit}`;
      const res = await api.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const countries = Array.isArray(countriesData?.items)
    ? countriesData.items
    : [];

  // ---- 6. Блок завантаження ----
  if (zonesLoading || countriesLoading) {
    const placeholders = Array.from({ length: 3 }, (_, i) => i);

    return (
      <section className={styles.profileSchd}>
        <div className={styles.headding}>
          <h3 className={clsx(styles.ttl, styles.ttlLoading, 'loading')}></h3>
        </div>
        <div className={styles.content}>
          <ul className={styles.ctrsListLoading}>
            {placeholders.map(i => (
              <li
                key={i}
                className={clsx(styles.item, styles.itemLoading, 'loading')}
              ></li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // ---- 8. Рендер ----
  return (
    <section className={styles.profileSchd}>
      <div className={styles.headding}>
        <h3 className={styles.ttl}>{t('profile.soon_title')}</h3>
      </div>

      <div className={styles.content}>
        <Swiper
          className={clsx(styles.slider, 'countriesSlider')}
          key={location.pathname}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1140: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              spaceBetween: 24,
            },
          }}
        >
          {countries.map(country => (
            <SwiperSlide key={country.id}>
              <CountryItem
                data={country}
                isLoading={countriesLoading}
                isProfile={true}
                zoneFromUp={nextZone}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
