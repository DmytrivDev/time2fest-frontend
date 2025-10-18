import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getValidLocale } from '@/utils/getValidLocale';
import { lockScroll, unlockScroll } from '../../utils/lockScroll';
import { api } from '@/utils/api';
import clsx from 'clsx';

import ZonesAside from '../common/ZonesAside';
import CountriesGrid from './CountriesGrid';

import styles from './CountriesList.module.scss';

const CountriesList = () => {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [showAside, setShowAside] = useState(false);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        setShowAside(false);
      }
    },
    [setShowAside]
  );

  // ---- Адаптив ----
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 868);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---- Блокування скролу ----
  useEffect(() => {
    if (showAside) {
      document.addEventListener('keydown', handleKeyDown);
      lockScroll(document.body);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
    };
  }, [showAside, handleKeyDown]);

  // ---- Поточна активна зона з URL ----
  const params = new URLSearchParams(location.search);
  const activeZone = params.get('tz');

  // ---- Отримання даних країн (перших 24) ----
  const { data, isLoading, error } = useQuery({
    queryKey: ['countries', locale],
    queryFn: async () => {
      // Перші 24 країни
      const res = await api.get(`/countries?locale=${locale}&page=1&limit=24`);
      return res.data;
    },
  });

  if (error || !data) return null;

  const countries = Array.isArray(data) ? data : [];

  // ---- Фільтрація ----
  const filteredCountries = activeZone
    ? countries.filter(c => c.time_zones?.some?.(z => z.code === activeZone))
    : countries;

  // ---- Групування ----
  const timeZoneMap = new Map();
  countries.forEach(c => {
    const zones = c.time_zones || [];
    const flag = c.CountryCode || null;

    zones.forEach(z => {
      const tz = z.code || 'Unknown';
      if (!timeZoneMap.has(tz)) {
        timeZoneMap.set(tz, { code: tz, flags: new Set() });
      }
      const entry = timeZoneMap.get(tz);
      if (flag) entry.flags.add(flag);
    });
  });

  const timeZonesData = Array.from(timeZoneMap.values()).map(item => ({
    code: item.code,
    flags: Array.from(item.flags),
    count: item.flags.size,
  }));

  // ---- Сортування ----
  timeZonesData.sort((a, b) => {
    const parseUTC = str => {
      if (!str || !str.startsWith('UTC')) return 0;
      const cleaned = str.replace('UTC', '').trim();
      const parts = cleaned.split(':');
      const hours = parseFloat(parts[0]) || 0;
      const minutes = parts[1] ? parseFloat(parts[1]) / 60 : 0;
      return hours + Math.sign(hours) * minutes;
    };
    return parseUTC(a.code) - parseUTC(b.code);
  });

  // ---- Рендер ----
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('countries.countries_title')}</h1>
          <p className={styles.subtitle}>{t('countries.countries_subtitle')}</p>

          {isMobile && (
            <button
              onClick={() => setShowAside(!showAside)}
              className={clsx(styles.mobBtn, 'btn_primary')}
            >
              {t('countries.choose_timezone')}
            </button>
          )}
        </div>

        {isMobile && (
          <>
            <div
              className={clsx(
                styles.asideBackdrop,
                showAside && styles.visible
              )}
              onClick={() => setShowAside(false)}
            />
            <div className={clsx(styles.asidePanel, showAside && styles.open)}>
              <ZonesAside
                isLoading={isLoading}
                error={error}
                data={timeZonesData}
                activeZone={activeZone}
                isMobile={isMobile}
                setShowAside={setShowAside}
              />
            </div>
          </>
        )}

        <div className={styles.inner}>
          {!isMobile && (
            <ZonesAside
              isLoading={isLoading}
              error={error}
              data={timeZonesData}
              activeZone={activeZone}
            />
          )}
          <CountriesGrid
            isLoading={isLoading}
            error={error}
            data={filteredCountries}
          />
        </div>
      </div>
    </section>
  );
};

export default CountriesList;
