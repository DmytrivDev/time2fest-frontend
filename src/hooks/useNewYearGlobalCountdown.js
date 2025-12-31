import { useEffect, useState } from 'react';
import { NEW_YEAR_TIMEZONES } from '@/utils/newYearTimezones';

const HOUR = 60 * 60 * 1000;

const getNewYearTimestampForZone = (offset) => {
  const now = new Date();

  const year =
    now.getUTCMonth() === 0 && now.getUTCDate() === 1
      ? now.getUTCFullYear()
      : now.getUTCFullYear() + 1;

  // 1 січня 00:00:00 UTC
  const utcNewYear = Date.UTC(year, 0, 1, 0, 0, 0);

  // зсув часової зони (підтримує дробні значення)
  return utcNewYear - offset * HOUR;
};

/**
 * Знаходимо першу "живу" зону (де diff > 0)
 * щоб уникнути стартових 00:00:00
 */
const getInitialZoneIndex = () => {
  const now = Date.now();

  const index = NEW_YEAR_TIMEZONES.findIndex((zone) => {
    const diff =
      getNewYearTimestampForZone(zone.offset) - now;
    return diff > 0;
  });

  return index !== -1 ? index : NEW_YEAR_TIMEZONES.length - 1;
};

export const useNewYearGlobalCountdown = () => {
  const [zoneIndex, setZoneIndex] = useState(() =>
    getInitialZoneIndex()
  );

  const zone = NEW_YEAR_TIMEZONES[zoneIndex];

  const [diff, setDiff] = useState(() =>
    getNewYearTimestampForZone(zone.offset) - Date.now()
  );

  useEffect(() => {
    const tick = () => {
      const nextDiff =
        getNewYearTimestampForZone(zone.offset) - Date.now();

      if (nextDiff <= 0) {
        setZoneIndex((prev) =>
          prev + 1 < NEW_YEAR_TIMEZONES.length ? prev + 1 : prev
        );
      } else {
        setDiff(nextDiff);
      }
    };

    // 🔹 миттєвий перерахунок (без очікування 1с)
    tick();

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [zone.offset]);

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));

  return {
    timezone: zone.label,
    offset: zone.offset,
    zoneIndex,

    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,

    isFinished:
      zoneIndex === NEW_YEAR_TIMEZONES.length - 1 && diff <= 0,
  };
};
