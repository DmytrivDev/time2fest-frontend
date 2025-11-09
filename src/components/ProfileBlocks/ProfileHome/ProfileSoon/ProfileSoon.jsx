import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getValidLocale } from '@/utils/getValidLocale';
import { useLocation } from 'react-router-dom';
import { api } from '@/utils/api';
import clsx from 'clsx';

import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import CountryItem from '../../../common/CountryItem';

import styles from './ProfileSoon.module.scss';

export default function ProfileSoon() {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getValidLocale();

  // ---- 1. Завантажуємо усі часові зони ----
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

  // ---- 2. Обчислюємо для кожної зони момент НР ----
  const withNY = (zonesData || []).map(zone => {
  const utcStr = zone.code || zone.zone;
  const ny = getNextNYLocalForUtcOffset(utcStr, { reference: now });

  // 🎭 Імітація: у +14 і +13 НР вже відбувся

  return {
    ...zone,
    utcStr,
    nyInstant: ny.instant,
    nyLocal: ny.display,
    hasPassed: now >= ny.instant,
    diffMs: ny.instant - now,
  };
});

// ---- 3. Відбираємо лише ті, де НР ще не настав ----
const upcoming = withNY.filter(z => !z.hasPassed);

// ---- 4. Знаходимо найближчу ----
const nextZone =
  upcoming.length > 0
    ? upcoming.reduce((a, b) => (a.diffMs < b.diffMs ? a : b))
    : null;

  // ---- 5. Завантаження країн через /countries ----
  const {
    data: countriesData,
    isLoading: countriesLoading,
    error: countriesError,
  } = useQuery({
    enabled: !!nextZone,
    queryKey: ['countries', locale, nextZone?.utcStr],
    queryFn: async () => {
      const limit = 24; // як у твоєму прикладі
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

  // ---- 7. Вивід ----
  return (
    <section className={styles.profileSchd}>
      <div className={styles.headding}>
        <h3 className={styles.ttl}>Найближче святкування</h3>
      </div>

      <div className={styles.content}>
        {!zonesLoading && !countriesLoading && nextZone && (
          <>
            {countries.length > 0 ? (
              <Swiper
                key={location.pathname}
                spaceBetween={24}
                slidesPerView={3}
                className={clsx(styles.slider, 'countriesSlider')}
              >
                {countries.map(country => (
                  <SwiperSlide key={country.id}>
                    <CountryItem data={country} isProfile={true} zoneFromUp={nextZone} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <span></span>
            )}
          </>
        )}
      </div>
    </section>
  );
}
