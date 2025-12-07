import { useMemo, useCallback } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { useReplaceCountryPopupStore } from '@/stores/useReplaceCountryPopupStore';

export function useScheduleToggle({ slug, code, zone }) {
  const countries = useGraphStore(s => s.countries ?? []);
  const addCountry = useGraphStore(s => s.addCountry);
  const removeCountry = useGraphStore(s => s.removeCountry);
  const openPopup = useReplaceCountryPopupStore(s => s.openPopup);

  // ---- Нормалізація UTC ----
  const normalizedZone = useMemo(() => {
    if (!zone) return '';
    return zone
      .replace(/^UTC\s*/i, '')
      .replace(':00', '')
      .trim();
  }, [zone]);

  const safeCountries = Array.isArray(countries) ? countries : [];

  // країна, що вже стоїть у цій зоні
  const existingCountry = safeCountries.find(
    c => String(c.zone).trim() === String(normalizedZone)
  );

  const isAdded = existingCountry?.slug === slug;

  // ---- Перемикач ----
  const handleToggle = useCallback(() => {
    if (!slug || !code || !normalizedZone) return;

    const newCountry = {
      slug,
      code,
      zone: normalizedZone,
    };

    if (isAdded) {
      removeCountry(slug, normalizedZone);
      return;
    }

    if (existingCountry && existingCountry.slug !== slug) {
      openPopup(existingCountry, newCountry, normalizedZone);
      return;
    }

    addCountry(newCountry);
  }, [
    slug,
    code,
    normalizedZone,
    isAdded,
    existingCountry,
    addCountry,
    removeCountry,
    openPopup,
  ]);

  return { isAdded, handleToggle };
}
