// utils/ny-time.ts

/** IANA-таймзона користувача (fallback: 'UTC'; SSR-safe) */
export function getUserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

/** Локаль користувача для форматування (SSR-safe) */
export function getUserLocale(): string {
  if (typeof navigator !== 'undefined') {
    return (navigator.languages && navigator.languages[0]) || navigator.language || 'en-US';
  }
  return 'en-US';
}

/** Нормалізує "UTC+2", "UTC-05", "UTC+05:30" -> "+02:00", "-05:00", "+05:30" */
function normalizeUtcOffsetStr(utcStr: string): string {
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

/** Рік найближчого НР для заданого офсету (без DST): якщо вже минуло – наступний рік */
function getTargetYearForOffset(now: Date, normOffset: string): number {
  const y = now.getFullYear();
  const thisNY = new Date(`${y}-01-01T00:00:00${normOffset}`);
  return now < thisNY ? y : y + 1;
}

/** Форматує дату у TZ користувача з локаллю користувача */
function formatInUserTZ(d: Date, userTZ: string, opts?: { timeOnly?: boolean; locale?: string }) {
  const locale = opts?.locale || getUserLocale();
  const timeOnly = opts?.timeOnly !== false; // за замовчуванням true
  const base: Intl.DateTimeFormatOptions = {
    timeZone: userTZ,
    hour: '2-digit',
    minute: '2-digit',
  };
  const withDate: Intl.DateTimeFormatOptions = {
    ...base,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, timeOnly ? base : withDate).format(d);
}

/**
 * Головна функція:
 * - utcOffsetStr: "UTC+2", "UTC-05", "UTC+05:30" (фіксований офсет; DST не враховується)
 * - options.userTimeZone: примусова TZ користувача (інакше береться з браузера)
 * - options.userLocale: примусова локаль (інакше береться з браузера)
 * - options.reference: дата «зараз» (для тестів; за замовчуванням new Date())
 */
export function getNextNYLocalForUtcOffset(
  utcOffsetStr: string,
  options?: { userTimeZone?: string; userLocale?: string; reference?: Date },
): {
  /** Абсолютний момент настання НР у даному офсеті */
  instant: Date;
  /** Тільки час у TZ користувача, напр. "23:00" */
  localTime: string;
  /** Повний формат у TZ користувача, напр. "31 Dec 2025, 23:00" (залежно від локалі) */
  localFull: string;
  /** Зручно для UI: якщо дата відрізняється від 1 січня — показувати localFull, інакше localTime */
  display: string;
  /** Чи місцева календарна дата НЕ 1 січня */
  localDateDiffers: boolean;
  /** Рік НР для даного офсету */
  year: number;
  /** Нормалізований офсет "+02:00", "-05:00", ... */
  normOffset: string;
} {
  const userTZ = options?.userTimeZone || getUserTimeZone();
  const userLocale = options?.userLocale || getUserLocale();
  const norm = normalizeUtcOffsetStr(utcOffsetStr);

  const now = options?.reference ?? new Date();
  const year = getTargetYearForOffset(now, norm);
  const nyInstant = new Date(`${year}-01-01T00:00:00${norm}`);

  const localTime = formatInUserTZ(nyInstant, userTZ, { timeOnly: true, locale: userLocale });
  const localFull = formatInUserTZ(nyInstant, userTZ, { timeOnly: false, locale: userLocale });

  // Перевіряємо, чи у користувача це саме 1 січня
  const day = new Intl.DateTimeFormat(userLocale, { timeZone: userTZ, day: '2-digit' }).format(
    nyInstant,
  );
  const month = new Intl.DateTimeFormat(userLocale, { timeZone: userTZ, month: '2-digit' }).format(
    nyInstant,
  );
  const localDateDiffers = !(day === '01' && month === '01');

  return {
    instant: nyInstant,
    localTime,
    localFull,
    display: localDateDiffers ? localFull : localTime,
    localDateDiffers,
    year,
    normOffset: norm,
  };
}
