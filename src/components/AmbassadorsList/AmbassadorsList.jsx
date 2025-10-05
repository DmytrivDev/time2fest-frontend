import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';

import AmbassadorsAside from './AmbassadorsAside';
import AmbassadorsGrid from './AmbassadorsGrid';

import styles from './AmbassadorsList.module.scss';

const AmbassadorsList = () => {
  const { t } = useTranslation();
  const locale = getValidLocale();
  const location = useLocation();

  // поточна активна зона з URL
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

  // ---- Фільтрація за часовою зоною ----
  const filteredAmbassadors = activeZone
    ? ambassadors.filter(amb => amb.timeZone === activeZone)
    : ambassadors;

  // ---- Групування за часовими поясами ----
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
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>{t('ambassadors.ambassadors_title')}</h1>
          <p className={styles.subtitle}>
            {t('ambassadors.ambassadors_subtitle')}
          </p>
        </div>

        <div className={styles.inner}>
          <AmbassadorsAside
            isLoading={isLoading}
            error={error}
            data={timeZonesData}
            activeZone={activeZone}
          />

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
