import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import ZonesInfoCard from '../MapInfo/ZonesInfoCard';
import MapInfo from '../MapInfo/CountryInfoCard';
import clsx from 'clsx';

import { useScheduleStore  } from '../../../stores/useScheduleStore';
import { useTimeZoneCountries } from '../../../hooks/useTimeZoneCountries';
import SheduleItem from './SheduleItem';

import styles from './ProfileSchedule.module.scss';

export default function ProfileSchedule() {
  const { t } = useTranslation();
  const locale = getValidLocale();

  // ---- Zustand ----
  const selectedZone = useScheduleStore (s => s.selectedZone);
  const selectedCountry = useScheduleStore (s => s.selectedCountry);
  const hasSelection = useScheduleStore (s => s.hasSelection);
  const setMapSelection = useScheduleStore (s => s.setMapSelection);
  const setHasSelection = useScheduleStore (s => s.setHasSelection);

  // ---- Запити ----
  const { data, isLoading, error } = useQuery({
    queryKey: ['time-zones', locale],
    queryFn: async () => {
      const res = await api.get(`/time-zones?locale=${locale}`);
      return res.data;
    },
  });

  // ❗Викликаємо всі хуки перед будь-яким return
  const { data: tzCountriesMap, isLoading: tzLoading } =
    useTimeZoneCountries(selectedZone);

  const { data: countryApiData, isLoading: countryLoading } = useQuery({
    enabled: !!selectedCountry,
    queryKey: ['country', locale, selectedCountry],
    queryFn: async () => {
      const res = await api.get(
        `/countries?locale=${locale}&code=${selectedCountry}`
      );
      return res.data?.items?.[0] || res.data?.data?.[0] || null;
    },
  });

  // ---- Далі умовна логіка ----
  if (error || !data) return null;

  const getCode = c =>
    (
      c?.CountryCode ??
      c?.attributes?.CountryCode ??
      c?.attributes?.code ??
      c?.code ??
      ''
    )
      .toString()
      .toUpperCase();

  const mapItems = selectedCountry
    ? Array.isArray(tzCountriesMap)
      ? tzCountriesMap.filter(c => getCode(c) === selectedCountry)
      : []
    : Array.isArray(tzCountriesMap)
      ? tzCountriesMap
      : [];

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
    (mapItems && mapItems.length > 0
      ? mapItems[0].attributes || mapItems[0]
      : null);

  return (
    <>
      <div className={styles.profileContent}>
        <div className={styles.heading}>
          <div>
            <h1>Графік святкувань</h1>
          </div>
        </div>

        <ul className={styles.scheduleList}>
          {data.map(({ code }) => (
            <SheduleItem
              key={code}
              code={code}
              isLoading={isLoading}
              onZoneClick={handleZoneClick}
            />
          ))}
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
              countries={mapItems}
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
