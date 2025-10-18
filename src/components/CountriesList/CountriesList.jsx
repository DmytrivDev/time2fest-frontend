import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const [activeZone, setActiveZone] = useState(null);

  // ---- Витяг з квері ----
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tz = params.get('tz');
    setActiveZone(tz || null);
  }, [location.search]);

  // ---- Адаптив ----
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 868);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---- Блокування скролу ----
  const handleKeyDown = useCallback(e => {
    if (e.key === 'Escape') setShowAside(false);
  }, []);

  useEffect(() => {
    if (showAside) {
      document.addEventListener('keydown', handleKeyDown);
      lockScroll(document.body);
    } else {
      unlockScroll();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
    };
  }, [showAside, handleKeyDown]);

  // ---- Завантаження часових зон ----
  const { data: zonesData, isLoading: zonesLoading } = useQuery({
    queryKey: ['time-zones', locale],
    queryFn: async () => {
      const res = await api.get(`/time-zones?locale=${locale}`);
      return res.data;
    },
  });

  // ---- Завантаження країн ----
  const {
    data: countriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['countries', locale, activeZone],
    queryFn: async () => {
      const baseUrl = `/countries?locale=${locale}&page=1&limit=18`;
      const url = activeZone
        ? `${baseUrl}&tz=${encodeURIComponent(activeZone)}`
        : baseUrl;
      const res = await api.get(url);
      return res.data;
    },
  });

  // ---- Перемикання фільтра ----
  const toggleZone = code => {
    const params = new URLSearchParams(location.search);
    if (activeZone === code) {
      params.delete('tz');
      setActiveZone(null);
    } else {
      params.set('tz', code);
      setActiveZone(code);
    }
    navigate({ search: params.toString() });
  };

  // ---- Підготовка списку країн ----
  const countries = Array.isArray(countriesData) ? countriesData : [];

  // 🔁 Розгортаємо країни по всіх часових зонах
  const expandedCountries = countries.flatMap(country => {
    const zones = country.time_zones || [];
    if (!zones.length) return [country];

    // Створюємо копію країни для кожного таймзону
    return zones.map(tz => ({
      ...country,
      time_zones: [tz], // лише поточна зона
    }));
  });

  // 🧭 Якщо вибрано фільтр — залишаємо лише вибрану зону
  const filteredCountries = activeZone
    ? expandedCountries.filter(
        item =>
          item.time_zones?.[0]?.code?.toLowerCase() === activeZone.toLowerCase()
      )
    : expandedCountries;

  // ---- Рендер ----
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        {/* --- Заголовок --- */}
        <div className={styles.header}>
          <h1 className={styles.title}>{t('controls.countries_title')}</h1>
          <p className={styles.subtitle}>{t('controls.countries_subtitle')}</p>

          {isMobile && (
            <button
              onClick={() => setShowAside(!showAside)}
              className={clsx(styles.mobBtn, 'btn_primary')}
            >
              {t('ambassadors.choose_timezone')}
            </button>
          )}
        </div>

        {/* --- Мобільна бічна панель --- */}
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
                isLoading={zonesLoading}
                data={zonesData}
                activeZone={activeZone}
                onSelectZone={toggleZone}
                isMobile={isMobile}
                setShowAside={setShowAside}
              />
            </div>
          </>
        )}

        {/* --- Основний контент --- */}
        <div className={styles.inner}>
          {!isMobile && (
            <ZonesAside
              isLoading={zonesLoading}
              data={zonesData}
              activeZone={activeZone}
              onSelectZone={toggleZone}
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
