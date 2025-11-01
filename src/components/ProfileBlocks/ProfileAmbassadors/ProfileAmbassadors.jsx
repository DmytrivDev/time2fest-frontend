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

import styles from './ProfileAmbassadors.module.scss';

export default function ProfileAmbassadors() {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
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
  const limit = 24;
  const {
    data: ambassadorsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ambassadors-list', locale, activeZone, page],
    queryFn: async () => {
      const baseUrl = `/ambassadors-list?locale=${locale}&page=${page}&limit=${limit}`;
      const url = activeZone
        ? `${baseUrl}&timeZone=${encodeURIComponent(activeZone)}`
        : baseUrl;

      const res = await api.get(url);
      return res.data; // { items, meta }
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
  const ambassadors = Array.isArray(ambassadorsData?.items)
    ? ambassadorsData.items
    : [];
  const totalPages = ambassadorsData?.meta?.pagination?.pageCount || 1;

  return (
    <div ref={contentRef} className={styles.profileContent}>
      <div className={styles.heading}>
        <div>
          <h1>Список амбасадорів</h1>
          <p>Познайомся з людьми, які діляться своїми святами, традиціями й настроєм у новорічну ніч.</p>
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
          <ZonesAside
            isLoading={zonesLoading}
            data={zonesData}
            activeZone={activeZone}
            onSelectZone={toggleZone}
          />
        </div>

        <AmbassadorsGrid isLoading={isLoading} error={error} data={ambassadors} />

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
