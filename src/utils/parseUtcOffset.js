export const parseUtcOffset = (zoneId) => {
  // очікуємо формат: UTC+8, UTC-3:30, UTC+8:45
  const match = zoneId.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/);

  if (!match) return null;

  const sign = match[1] === '-' ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = match[3] ? Number(match[3]) : 0;

  return sign * (hours + minutes / 60);
};
