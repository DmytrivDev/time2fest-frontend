/** IANA-таймзона користувача (fallback: 'UTC'; SSR-safe) */
export function getUserTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

/** Локаль користувача для форматування (SSR-safe) */
export function getUserLocale() {
  if (typeof navigator !== 'undefined') {
    return (navigator.languages && navigator.languages[0]) || navigator.language || 'en-US';
  }
  return 'en-US';
}

/** Нормалізує "UTC+2", "UTC-05", "UTC+05:30" -> "+02:00", "-05:00", "+05:30" */
function normalizeUtcOffsetStr(utcStr) {
  const s = utcStr.trim().toUpperCase().replace(/\s+/g, '');
  const m = /^UTC([+-])(\d{1,2})(?::?(\d{2}))?$/.exec(s);
  if (!m) throw new Error(`Invalid UTC offset string: "${utcStr}"`);
  const sign = m[1] === '-' ? -1 : 1;
  const hh = Number(m[2]);
  const mm = Number(m[3] || '0');
  if (hh > 14 || mm > 59) throw new Error(`Out-of-range offset: "${utcStr}"`);
  const hhStr = String(hh).padStart(2, '0');
  const mmStr = String(mm).padStart(2, '0');
  return `${sign < 0 ? '-' : '+'}${hhStr}:${mmStr}`;
}

/** Рік для НР у даному офсеті */
function getTargetYearForOffset(now, normOffset) {
  const y = now.getFullYear();
  const thisNY = new Date(`${y}-01-01T00:00:00${normOffset}`);
  return now < thisNY ? y : y + 1;
}

/** Завжди форматує повну дату у TZ користувача з локаллю користувача */
function formatFullInUserTZ(d, userTZ, locale) {
  const opts = {
    timeZone: userTZ,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat(locale, opts).format(d);
}

/**
 * Головна функція
 */
export function getNextNYLocalForUtcOffset(utcOffsetStr, options = {}) {
  const userTZ = options.userTimeZone || getUserTimeZone();
  const userLocale = options.userLocale || getUserLocale();
  const norm = normalizeUtcOffsetStr(utcOffsetStr);

  const now = options.reference ?? new Date();
  const year = getTargetYearForOffset(now, norm);
  const nyInstant = new Date(`${year}-01-01T00:00:00${norm}`);

  const localFull = formatFullInUserTZ(nyInstant, userTZ, userLocale);

  return {
    instant: nyInstant,
    localTime: localFull,     // тепер і тут завжди повна дата
    localFull,                // повна дата
    display: localFull,       // завжди повна дата
    localDateDiffers: true,   // поле лишаємо, але завжди true
    year,
    normOffset: norm,
  };
}