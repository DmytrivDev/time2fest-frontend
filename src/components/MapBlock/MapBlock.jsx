import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import ZonesList from './ZonesList';
import MapCanvas from '../MapCanvas';

import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useMapStore } from '../../stores/useMapStore';
import { useTimeZoneCountries } from '../../hooks/useTimeZoneCountries';

import styles from './MapBlock.module.scss';

export default function MapBlock() {
  const { t } = useTranslation('common');
  const locale = getValidLocale();

  // ---- Zustand state ----
  const mode = useMapStore(s => s.mode);
  const setMode = useMapStore(s => s.setMode);
  const selectedZone = useMapStore(s => s.selectedZone);
  const selectedCountry = useMapStore(s => s.selectedCountry);
  const hasSelection = useMapStore(s => s.hasSelection);
  const setMapSelection = useMapStore(s => s.setMapSelection);
  const setHasSelection = useMapStore(s => s.setHasSelection);
  const listLevel = useMapStore(s => s.listLevel);
  const listZone = useMapStore(s => s.listZone);
  const enterListCountries = useMapStore(s => s.enterListCountries);
  const backToListZones = useMapStore(s => s.backToListZones);

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

  // ---- LIST zones ----
  const {
    data: zonesResp,
    isLoading: zonesLoading,
    error: zonesError,
  } = useQuery({
    enabled: mode === 'list' && listLevel === 'zones',
    queryKey: ['time-zones', locale],
    queryFn: async () => {
      const res = await api.get(
        `/time-zones?populate=countries&locale=${locale}`
      );
      return res.data?.data ?? res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // ---- LIST countries ----
  const {
    data: tzCountriesList,
    isLoading: tzLoadingList,
    error: tzErrorList,
  } = useTimeZoneCountries(
    mode === 'list' && listLevel === 'countries' ? listZone : null
  );

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

  // ---- Scroll helper ----
  const scrollListTop = () => {
    requestAnimationFrame(() => {
      if (!listRef.current) return;
      let offset = 45;
      if (window.innerWidth < 1140) {
        const header = document.querySelector('header');
        offset = header ? header.offsetHeight + 20 : 45;
      }
      const top =
        listRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  // ---- Handlers ----
  const handleZoneClick = (zoneCode, countryCode) => {
    if (countryCode) {
      setMapSelection(zoneCode || null, countryCode);
    } else if (zoneCode) {
      setMapSelection(zoneCode, null);
    }
    setHasSelection(true);
    scrollListTop();
  };

  const handlePickZoneFromList = zoneCode => {
    enterListCountries(zoneCode);
    scrollListTop();
  };

  const handleBackToZones = () => {
    backToListZones();
    scrollListTop();
  };

  // ---- Render ----
  return (
    <section id="new-year" className={styles.map}>
      <div className="container">
        <div className={styles.top}>
          <h2>{t('controls.map_title')}</h2>

          <ToggleGroup.Root
            type="single"
            value={mode}
            onValueChange={v => v && setMode(v)}
            className={styles.toggleWrap}
          >
            <ToggleGroup.Item value="map" className={styles.toggleItem}>
              <span>{t('controls.map')}</span>
            </ToggleGroup.Item>

            <ToggleGroup.Item value="list" className={styles.toggleItem}>
              <span>{t('controls.list')}</span>
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>

        {mode === 'map' && (
          <>
            <MapCanvas key={windowWidth} onZoneClick={handleZoneClick} />
            <div ref={listRef}>
              {hasSelection && (
                <ZonesList
                  type="countries"
                  zone={selectedZone}
                  loading={tzLoadingMap}
                  error={tzErrorMap}
                  items={mapItems}
                />
              )}
            </div>
          </>
        )}

        {mode === 'list' && (
          <div ref={listRef}>
            {listLevel === 'zones' && (
              <ZonesList
                type="zones"
                loading={zonesLoading}
                error={zonesError}
                items={zonesResp}
                onZonePick={handlePickZoneFromList}
              />
            )}
            {listLevel === 'countries' && (
              <ZonesList
                type="countries"
                zone={listZone}
                loading={tzLoadingList}
                error={tzErrorList}
                items={Array.isArray(tzCountriesList) ? tzCountriesList : []}
                onBack={handleBackToZones}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
