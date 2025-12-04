// useScheduleToggle.js
import { useMemo, useCallback } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';

export function useScheduleToggle({ slug, code, zone }) {
  const countries = useGraphStore(s => s.countries ?? []);
  const addCountry = useGraphStore(s => s.addCountry);
  const removeCountry = useGraphStore(s => s.removeCountry);

  // захист від undefined
  const safeCountries = Array.isArray(countries) ? countries : [];

  const normalizedZone = useMemo(() => {
    if (!zone) return '';
    return zone.replace(/^UTC\s*/i, '').replace(':00', '').trim();
  }, [zone]);

  const isAdded = useMemo(() => {
    if (!slug || !normalizedZone) return false;

    return safeCountries.some(
      c =>
        c?.country?.toLowerCase?.() === slug.toLowerCase() &&
        String(c.zone).trim() === String(normalizedZone)
    );
  }, [safeCountries, slug, normalizedZone]);

  const handleToggle = useCallback(() => {
    if (!slug || !code || !normalizedZone) return;

    const obj = {
      slug,
      country: slug,
      code,
      zone: normalizedZone,
    };

    if (isAdded) {
      removeCountry(slug, normalizedZone);
    } else {
      addCountry(obj);
    }
  }, [slug, code, normalizedZone, isAdded, addCountry, removeCountry]);

  return {
    isAdded,
    handleToggle,
  };
}
