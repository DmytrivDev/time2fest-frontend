import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import ZonesInfoCard from '../MapInfo/ZonesInfoCard';
import MapInfo from '../MapInfo/CountryInfoCard';
import clsx from 'clsx';

import { useGraphStore } from '@/stores/useGraphStore';
import { useScheduleStore } from '../../../stores/useScheduleStore';
import { useTimeZoneCountries } from '../../../hooks/useTimeZoneCountries';
import SheduleItem from './SheduleItem';

import styles from './ProfileSchedule.module.scss';

export default function ProfileSchedule() {
  const { t } = useTranslation();
  const locale = getValidLocale();

  // ---- Zustand ----
  const selectedZone = useScheduleStore(s => s.selectedZone);
  const selectedCountry = useScheduleStore(s => s.selectedCountry);
  const hasSelection = useScheduleStore(s => s.hasSelection);
  const setMapSelection = useScheduleStore(s => s.setMapSelection);
  const setHasSelection = useScheduleStore(s => s.setHasSelection);

  const { countries } = useGraphStore();

  // ---- 1. Отримуємо часові зони ----
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

  // ---- 2. Готуємо параметр для /countries-light ----
  const zonesParam = countries
    .map(c => `${c.country.toLowerCase()}:${c.zone}`)
    .join(',');

  // ---- 3. Отримуємо легкі країни ----
  const { data: lightCountries = [], isLoading: lightLoading } = useQuery({
    queryKey: ['countries-light', zonesParam, locale],
    queryFn: async () => {
      if (!zonesParam) return [];
      const res = await api.get(
        `/countries-light?zones=${zonesParam}&locale=${locale}`
      );

      // 👉 додаємо "UTC" до кожної зони відразу тут
      return (res.data || []).map(item => ({
        ...item,
        zone: `UTC${item.zone}`,
      }));
    },
    enabled: countries.length > 0,
  });

  // ---- 4. Формуємо мапу для швидкого доступу ----
  const lightMap = Object.fromEntries(
    (lightCountries || []).map(item => [item.zone.trim(), item])
  );

  // ---- 5. Дані по країні ----
  const { data: tzCountriesMap, isLoading: tzLoading } =
    useTimeZoneCountries(selectedZone);

  const { data: countryApiData, isLoading: countryLoading } = useQuery({
    enabled: !!selectedCountry,
    queryKey: ['country', locale, selectedCountry],
    queryFn: async () => {
      const res = await api.get(
        `/countries?locale=${locale}&slug=${selectedCountry}`
      );
      return res.data?.items?.[0] || res.data?.data?.[0] || null;
    },
  });

  // ---- 6. Обробка подій ----
  const handleZoneClick = (zoneCode, countryCode) => {
    if (countryCode) {
      setMapSelection(zoneCode || null, countryCode);
    } else if (zoneCode) {
      setMapSelection(zoneCode, null);
    }
    setHasSelection(true);
  };

  const countryData =
    countryApiData ||
    (Array.isArray(tzCountriesMap) && tzCountriesMap.length > 0
      ? tzCountriesMap[0].attributes || tzCountriesMap[0]
      : null);

  // ---- 7. Перевірка ----
  if (error || zonesData.length === 0) {
    // створюємо 37 "заглушок"
    const placeholders = Array.from({ length: 37 }, (_, i) => i);

    return (
      <>
        <div className={styles.profileContent}>
          <div className={styles.heading}>
            <h1>{t('profile.schadule')}</h1>
          </div>

          <ul className={styles.scheduleList}>
            {placeholders.map(i => (
              <li key={i} className={clsx(styles.item, 'loading')}></li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  // ---- 8. Рендер ----
  return (
    <>
      <div className={styles.profileContent}>
        <div className={styles.heading}>
          <h1>{t('profile.schadule')}</h1>
        </div>

        <ul className={styles.scheduleList}>
          {zonesData.map(({ code }) => {
            const country = lightMap[code] || null;

            return (
              <SheduleItem
                key={code}
                code={code}
                isLoading={zonesLoading || lightLoading}
                onZoneClick={handleZoneClick}
                country={country}
              />
            );
          })}
        </ul>
      </div>

      {hasSelection && (
        <>
          {selectedCountry ? (
            <MapInfo
              data={countryData || {}}
              zone={selectedZone}
              onClose={() => setHasSelection(false)}
              loading={tzLoading || countryLoading || !countryData}
            />
          ) : (
            <ZonesInfoCard
              zone={selectedZone}
              countries={tzCountriesMap || []}
              loading={tzLoading}
              onClose={() => setHasSelection(false)}
              onCountrySelect={countryCode => {
                setMapSelection(selectedZone, countryCode);
                setHasSelection(true);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
