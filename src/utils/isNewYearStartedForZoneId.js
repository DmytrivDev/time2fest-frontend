import { parseUtcOffset } from './parseUtcOffset';

const HOUR = 60 * 60 * 1000;

const getNewYearTimestampForOffset = (offset) => {
  const now = new Date();

  const year =
    now.getUTCMonth() === 0 && now.getUTCDate() === 1
      ? now.getUTCFullYear()
      : now.getUTCFullYear() + 1;

  const utcNewYear = Date.UTC(year, 0, 1, 0, 0, 0);

  return utcNewYear - offset * HOUR;
};

export const isNewYearStartedForZoneId = (zoneId) => {
  const offset = parseUtcOffset(zoneId);
  if (offset === null) return false;

  return Date.now() >= getNewYearTimestampForOffset(offset);
};
