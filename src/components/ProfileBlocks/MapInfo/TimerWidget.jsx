import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCountdownToTimezone } from '@/hooks/useKiritimatiNYCountdown';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';
import styles from './MapInfo.module.scss';

export default function TimerWidget({ zone }) {
  const { t } = useTranslation('common');

  // --- нормалізація UTC ---
  const utcOffsetStr = useMemo(() => {
    if (zone && zone.toUpperCase().startsWith('UTC')) return zone;
    return 'UTC+0';
  }, [zone]);

  // --- дата нового року для конкретної зони ---
  const ny = useMemo(
    () => getNextNYLocalForUtcOffset(utcOffsetStr),
    [utcOffsetStr]
  );

  // --- годинне зміщення ---
  const safeTzHours = useMemo(() => {
    const offset = utcOffsetStr || 'UTC+0';
    const hours = parseInt(offset.replace('UTC', '').replace(':00', '')) || 0;
    return hours;
  }, [utcOffsetStr]);

  // --- хук зворотного відліку ---
  const countdown = useCountdownToTimezone(safeTzHours);

  // --- рендер ---
  return (
    <div className={styles.countdown}>
      <p className={styles.text}>
        {t('controls.ny_at')} {ny.display}
      </p>

      <div className={styles.timer}>
        <div>
          {countdown.days}
          <span>{t('days')}</span>
        </div>
        :
        <div>
          {countdown.hours}
          <span>{t('hours')}</span>
        </div>
        :
        <div>
          {countdown.minutes}
          <span>{t('minutesS')}</span>
        </div>
        :
        <div>
          {countdown.seconds}
          <span>{t('secondsS')}</span>
        </div>
      </div>
    </div>
  );
}
