import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import MapCanvas from '../../MapCanvas';

import { getValidLocale } from '../../../utils/getValidLocale';
import { useMapStore } from '../../../stores/useMapStore';
import { useTimeZoneCountries } from '../../../hooks/useTimeZoneCountries';

import styles from './ProfileMap.module.scss';

export default function MapBlock() {
  const { t } = useTranslation('common');
  const locale = getValidLocale();

  // ---- Zustand state ----
  const selectedZone = useMapStore(s => s.selectedZone);
  const selectedCountry = useMapStore(s => s.selectedCountry);
  const hasSelection = useMapStore(s => s.hasSelection);

  const listRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ---- Resize ----
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---- MAP data ----
  const {
    data: tzCountriesMap,
    isLoading: tzLoadingMap,
    error: tzErrorMap,
  } = useTimeZoneCountries(selectedZone);



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


  // ---- Render ----
  return (
    <div className={styles.map}>
      <MapCanvas key={windowWidth} />
    </div>
  );
}
