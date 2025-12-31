import { useEffect, useState } from 'react';
import { isNewYearStartedForZoneId } from '@/utils/isNewYearStartedForZoneId';

export const useIsZoneEndedById = (zoneId) => {
  const [ended, setEnded] = useState(() =>
    isNewYearStartedForZoneId(zoneId)
  );

  useEffect(() => {
    if (ended) return;

    const interval = setInterval(() => {
      if (isNewYearStartedForZoneId(zoneId)) {
        setEnded(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [zoneId, ended]);

  return ended;
};
