import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { getValidLocale } from '@/utils/getValidLocale';
import { lockScroll, unlockScroll } from '../../../utils/lockScroll';
import { api } from '@/utils/api';
import clsx from 'clsx';

import ZonesAside from '../../common/ZonesAside';
import CountriesGrid from '../../CountriesList/CountriesGrid';
import Pagination from '../../common/Pagination';

import styles from './ProfileCountries.module.scss';

export default function MapBlock() {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const [showAside, setShowAside] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const [page, setPage] = useState(1);

  const contentRef = useRef(null);

  // ---- Витяг з квері ----
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tz = params.get('tz');
    const p = parseInt(params.get('page') || '1', 10);
    setActiveZone(tz || null);
    setPage(p > 0 ? p : 1);
  }, [location.search]);

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
  const limit = 24;
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
      return res.data;
    },
    keepPreviousData: true,
  });

  // ---- Прокрутка контейнера ----
  const scrollToTop = useCallback(() => {
    const block = contentRef.current;
    if (block) {
      block.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

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

    // ⬆️ одразу прокручуємо контейнер
    setTimeout(scrollToTop, 100);
  };

  // ---- Зміна сторінки ----
  const handlePageChange = newPage => {
    const params = new URLSearchParams(location.search);
    if (activeZone) params.set('tz', activeZone);
    params.set('page', newPage.toString());
    navigate({ search: params.toString() });

    // ⬆️ теж одразу прокручуємо контейнер
    setTimeout(scrollToTop, 100);
  };

  // ---- Підготовка даних ----
  const countries = Array.isArray(countriesData?.items)
    ? countriesData.items
    : [];
  const totalPages = countriesData?.meta?.pagination?.pageCount || 1;

  return (
    <div ref={contentRef} className={styles.profileContent}>
      <div className={styles.heading}>
        <div>
          <h1>{t('profile.ctrTtl')}</h1>
          <p>{t('profile.ctrTxt')}</p>
        </div>
        <button
          onClick={() => setShowAside(!showAside)}
          className="btn_primary"
        >
          {t('ambassadors.choose_timezone')}
        </button>
      </div>

      <div className={styles.countryGridCont}>
        <div className={clsx(styles.asidePanel, showAside && styles.open)}>
          <h2>Оберіть часову зону</h2>
          <button
            onClick={() => setShowAside(!showAside)}
            className={styles.close}
          ></button>

          <div
            className={styles.overlay}
            onClick={() => setShowAside(false)}
          ></div>

          <ZonesAside
            isLoading={zonesLoading}
            data={zonesData}
            activeZone={activeZone}
            onSelectZone={toggleZone}
          />
        </div>

        <CountriesGrid isLoading={isLoading} error={error} data={countries} />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
