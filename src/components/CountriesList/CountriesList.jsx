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
import Pagination from '../common/Pagination';
import styles from './CountriesList.module.scss';

const CountriesList = () => {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const [page, setPage] = useState(1);

  // ---- Витяг з квері ----
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tz = params.get('tz');
    const p = parseInt(params.get('page') || '1', 10);
    setActiveZone(tz || null);
    setPage(p > 0 ? p : 1);
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
  const limit = 18;

  const {
    data: countriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['countries', locale, activeZone, page],
    queryFn: async () => {
      const baseUrl = `/countries?locale=${locale}&page=${page}&limit=${limit}`;
      const url = activeZone
        ? `${baseUrl}&tz=${encodeURIComponent(activeZone)}`
        : baseUrl;

      const res = await api.get(url);
      return res.data; // ✅ { items, meta }
    },
    keepPreviousData: true,
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
    params.set('page', '1');
    navigate({ search: params.toString() });
  };

  // ---- Зміна сторінки ----
  const handlePageChange = newPage => {
    const params = new URLSearchParams(location.search);
    if (activeZone) params.set('tz', activeZone);
    params.set('page', newPage.toString());
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    const topEl = document.getElementById('topPage');
    if (!topEl) return;

    const rect = topEl.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY;

    const y = isMobile ? offsetTop - 40 : offsetTop;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }, [page, isMobile]);

  // ---- Підготовка даних ----
  const countries = Array.isArray(countriesData?.items)
    ? countriesData.items
    : [];
  const totalPages = countriesData?.meta?.pagination?.pageCount || 1;

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
        <div className={styles.inner} id="topPage">
          {!isMobile && (
            <ZonesAside
              isLoading={zonesLoading}
              data={zonesData}
              activeZone={activeZone}
              onSelectZone={toggleZone}
            />
          )}

          <div className={styles.gridWrapper}>
            <CountriesGrid
              isLoading={isLoading}
              error={error}
              data={countries}
            />

            {/* --- Пагінація --- */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountriesList;
