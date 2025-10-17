import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getValidLocale } from '@/utils/getValidLocale';
import { lockScroll, unlockScroll } from '../../utils/lockScroll';
import { api } from '@/utils/api';
import clsx from 'clsx';

import AmbassadorsAside from './AmbassadorsAside';
import AmbassadorsGrid from './AmbassadorsGrid';

import styles from './AmbassadorsList.module.scss';

const AmbassadorsList = () => {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [showAside, setShowAside] = useState(false);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        setShowAside();
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['ambassadors-list', locale],
    queryFn: async () => {
      const res = await api.get(`/ambassadors-list?locale=${locale}`);
      return res.data;
    },
  });

  if (error || !data) return null;

  const ambassadors = Array.isArray(data) ? data : [];

  // ---- Фільтрація ----
  const filteredAmbassadors = activeZone
    ? ambassadors.filter(amb => amb.timeZone === activeZone)
    : ambassadors;

  // ---- Групування ----
  const timeZoneMap = new Map();
  ambassadors.forEach(amb => {
    const tz = amb.timeZone || 'Unknown';
    const flag = amb.country?.code || null;
    if (!timeZoneMap.has(tz)) {
      timeZoneMap.set(tz, { code: tz, flags: new Set() });
    }
    const entry = timeZoneMap.get(tz);
    if (flag) entry.flags.add(flag);
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
          <h1 className={styles.title}>{t('ambassadors.ambassadors_title')}</h1>
          <p className={styles.subtitle}>
            {t('ambassadors.ambassadors_subtitle')}
          </p>

          {isMobile && (
            <button
              onClick={() => setShowAside(!showAside)}
              className={clsx(styles.mobBtn, 'btn_primary')}
            >
              {t('ambassadors.choose_timezone')}
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
              <AmbassadorsAside
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
            <AmbassadorsAside
              isLoading={isLoading}
              error={error}
              data={timeZonesData}
              activeZone={activeZone}
            />
          )}
          <AmbassadorsGrid
            isLoading={isLoading}
            error={error}
            data={filteredAmbassadors}
          />
        </div>
      </div>
    </section>
  );
};

export default AmbassadorsList;
