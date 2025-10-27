import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import MapCanvas from '../../MapCanvas';
import MapInfo from '../MapInfo/CountryInfoCard';

import { api } from '../../../utils/api';
import { getValidLocale } from '../../../utils/getValidLocale';
import { useMapStore } from '../../../stores/useMapStore';
import { useTimeZoneCountries } from '../../../hooks/useTimeZoneCountries';

import styles from './ProfileMap.module.scss';

export default function MapBlock() {
  const { t } = useTranslation('common');
  const locale = getValidLocale();

  // ---- Zustand ----
  const selectedZone = useMapStore(s => s.selectedZone);
  const selectedCountry = useMapStore(s => s.selectedCountry);
  const hasSelection = useMapStore(s => s.hasSelection);
  const setMapSelection = useMapStore(s => s.setMapSelection);
  const setHasSelection = useMapStore(s => s.setHasSelection);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---- MAP data ----
  const { data: tzCountriesMap, isLoading: tzLoading } =
    useTimeZoneCountries(selectedZone);

  // 🟢 окремий запит до API, якщо клікнули саме на країну
  const { data: countryApiData, isLoading: countryLoading } = useQuery({
    enabled: !!selectedCountry, // виконується лише коли обрана країна
    queryKey: ['country', locale, selectedCountry],
    queryFn: async () => {
      const res = await api.get(
        `/countries?locale=${locale}&code=${selectedCountry}`
      );
      return res.data?.items?.[0] || res.data?.data?.[0] || null; // залежно від структури
    },
  });

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
      // Клік по країні
      setMapSelection(zoneCode || null, countryCode);
    } else if (zoneCode) {
      // Клік по зоні
      setMapSelection(zoneCode, null);
    }
    setHasSelection(true);
  };

  // 🧩 вибір даних для відображення в MapInfo:
  // якщо є countryApiData → беремо його, інакше шукаємо локально у mapItems
  const countryData =
    countryApiData ||
    (mapItems && mapItems.length > 0
      ? mapItems[0].attributes || mapItems[0]
      : null);

  return (
    <div className={styles.map}>
      <MapCanvas
        key={windowWidth}
        windowWidth={windowWidth}
        onZoneClick={handleZoneClick}
      />

      {hasSelection && (
        <MapInfo
          data={countryData}
          zone={selectedZone}
          onClose={() => setHasSelection(false)}
          loading={tzLoading || countryLoading}
        />
      )}
    </div>
  );
}
