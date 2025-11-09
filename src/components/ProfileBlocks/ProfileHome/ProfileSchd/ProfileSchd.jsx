import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useGraphStore } from '@/stores/useGraphStore';
import SheduleItem from '../../ProfileSchedule/SheduleItem';

import styles from './ProfileSchd.module.scss';

export default function ProfilePayments() {
  const { t, i18n } = useTranslation();
  const locale = getValidLocale();

  // ---- 1. Беремо обрані країни користувача ----
  const { countries } = useGraphStore();
  const selected = countries || [];

  // ---- 2. Функція для коректного парсингу UTC (враховує хвилини) ----
  const parseZone = zone => {
    if (!zone) return 0;
    // нормалізуємо рядок
    const z = zone.toString().replace('UTC', '').trim();
    const sign = z.startsWith('-') ? -1 : 1;
    const [h, m] = z.replace('+', '').replace('-', '').split(':').map(Number);
    const hours = h || 0;
    const minutes = m || 0;
    return sign * (hours + minutes / 60);
  };

  // ---- 3. Сортуємо від +14 до -12 ----
  const sorted = [...selected].sort(
    (a, b) => parseZone(b.zone) - parseZone(a.zone)
  );

  // ---- 4. Беремо перші 4 ----
  const firstFour = sorted.slice(0, 4);

  // ---- 5. Формуємо параметр для API ----
  const zonesParam = firstFour
    .map(c => `${c.country.toLowerCase()}:${c.zone}`)
    .join(',');

  // ---- 6. Підтягуємо дані про країни ----
  const {
    data: lightCountries = [],
    isLoading,
  } = useQuery({
    queryKey: ['countries-light', zonesParam, locale],
    queryFn: async () => {
      if (!zonesParam) return [];
      const res = await api.get(
        `/countries-light?zones=${zonesParam}&locale=${locale}`
      );
      return (res.data || []).map(item => ({
        ...item,
        zone: `UTC${item.zone}`,
      }));
    },
    enabled: firstFour.length > 0,
  });

  // ---- 7. Формуємо мапу ----
  const lightMap = Object.fromEntries(
    (lightCountries || []).map(item => [item.zone.trim(), item])
  );

  // ---- 8. Якщо нічого не вибрано ----
  if (!firstFour.length) {
    return (
      <section className={styles.profileSchd}>
        <div className={styles.headding}>
          <h3 className={styles.ttl}>{t('profile.schadule')}</h3>
        </div>

        <div className={styles.content}>
          <p className={styles.emptyText}>
            {t('profile.no_selected_countries') ||
              'Ви ще не обрали країни для святкування.'}
          </p>
        </div>

        <div className={styles.bottom}>
          <Link
            to={`/${
              i18n.language !== 'en' ? i18n.language + '/' : ''
            }profile/schedule`}
            className={clsx(styles.btn, 'btn_primary')}
          >
            {t('profile.goto_schedule')}
          </Link>
        </div>
      </section>
    );
  }

  // ---- 9. Якщо вантажиться ----
  if (isLoading) {
    const placeholders = Array.from({ length: 4 }, (_, i) => i);
    return (
      <section className={styles.profileSchd}>
        <div className={styles.headding}>
          <h3 className={styles.ttl}>{t('profile.schadule')}</h3>
        </div>
        <div className={styles.content}>
          <ul className={styles.scheduleList}>
            {placeholders.map(i => (
              <li key={i} className={clsx(styles.item, 'loading')}></li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // ---- 10. Рендер ----
  return (
    <section className={styles.profileSchd}>
      <div className={styles.headding}>
        <h3 className={styles.ttl}>{t('profile.schadule')}</h3>
      </div>

      <div className={styles.content}>
        <ul className={styles.scheduleList}>
          {firstFour.map(({ zone }) => {
            const fullZone = zone.startsWith('UTC') ? zone : `UTC${zone}`;
            const country = lightMap[fullZone] || null;

            return (
              <SheduleItem
                key={zone}
                code={fullZone}
                country={country}
                isLoading={isLoading}
                onZoneClick={() => {}} // неактивно
              />
            );
          })}
        </ul>
      </div>

      <div className={styles.bottom}>
        <Link
          to={`/${
            i18n.language !== 'en' ? i18n.language + '/' : ''
          }profile/schedule`}
          className={clsx(styles.btn, 'btn_primary')}
        >
          {t('profile.goto_schedule')}
        </Link>
      </div>
    </section>
  );
}
