import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import MapCanvas from '../../MapCanvas';
import MapInfo from '../MapInfo/CountryInfoCard';
import ZonesInfoCard from '../MapInfo/ZonesInfoCard';

import { api } from '../../../utils/api';
import { getValidLocale } from '../../../utils/getValidLocale';
import { useMapStore } from '../../../stores/useMapStore';
import { useTimeZoneCountries } from '../../../hooks/useTimeZoneCountries';

import styles from './ProfileMap.module.scss';

export default function MapBlock() {
  const locale = getValidLocale();
  const { t } = useTranslation('common');

  // Zustand
  const selectedZone = useMapStore(s => s.selectedZone);
  const selectedCountry = useMapStore(s => s.selectedCountry); // slug
  const hasSelection = useMapStore(s => s.hasSelection);
  const setMapSelection = useMapStore(s => s.setMapSelection);
  const setHasSelection = useMapStore(s => s.setHasSelection);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // resize — re-render Canvas
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Countries for selected TZ
  const { data: tzCountriesMap, isLoading: tzLoading } =
    useTimeZoneCountries(selectedZone);

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

  const getSlug = c => c?.slug ?? c?.attributes?.slug ?? null;

  // 🔥 OLD LOGIC — unchanged
  const mapItems = selectedCountry
    ? Array.isArray(tzCountriesMap)
      ? tzCountriesMap.filter(c => getCode(c) === selectedCountry.toUpperCase())
      : []
    : Array.isArray(tzCountriesMap)
      ? tzCountriesMap
      : [];

  // 🔥 FIX: if mapItems empty, use selectedCountry as slug
  const countrySlug = mapItems?.[0]?.slug ?? selectedCountry ?? null;

  // Fetch country details
  const { data: countryApiData, isLoading: countryLoading } = useQuery({
    enabled: !!countrySlug,
    queryKey: ['country', locale, countrySlug],
    queryFn: async () => {
      const res = await api.get(
        `/countries?locale=${locale}&slug=${countrySlug}`
      );
      return res.data?.items?.[0] || res.data?.data?.[0] || null;
    },
  });

  // Click handler (unchanged)
  const handleZoneClick = (zoneCode, countryCode) => {
    const slug = countryCode ? countryCode.toLowerCase() : null;

    if (slug) {
      setMapSelection(zoneCode || null, slug);
    } else {
      setMapSelection(zoneCode || null, null);
    }

    setHasSelection(true);
  };

  return (
    <div className={styles.map}>
      <MapCanvas
        key={windowWidth}
        windowWidth={windowWidth}
        onZoneClick={handleZoneClick}
      />

      {hasSelection && (
        <>
          {selectedCountry ? (
            <MapInfo
              data={countryApiData || {}}
              zone={selectedZone}
              loading={tzLoading || countryLoading || !countryApiData}
              onClose={() => setHasSelection(false)}
            />
          ) : (
            <ZonesInfoCard
              zone={selectedZone}
              countries={mapItems}
              loading={tzLoading}
              onClose={() => setHasSelection(false)}
              onCountrySelect={countryCode => {
                const found = tzCountriesMap?.find(
                  c => getCode(c) === countryCode
                );
                const slug = getSlug(found);
                setMapSelection(selectedZone, slug);
                setHasSelection(true);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
