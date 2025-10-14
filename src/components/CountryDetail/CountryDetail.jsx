import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import { useCountdownToTimezone } from '../../hooks/useKiritimatiNYCountdown';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5'; 

import styles from './CountryDetail.module.scss';

const CountryDetail = ({ data, isLoading, error, tzParam }) => {
  const { t } = useTranslation();

  const utcOffsetStr = useMemo(() => {
    if (tzParam && tzParam.toUpperCase().startsWith('UTC')) return tzParam;
    return 'UTC+0';
  }, [tzParam]);

  const ny = useMemo(
    () => getNextNYLocalForUtcOffset(utcOffsetStr),
    [utcOffsetStr]
  );

  const safeTzHours = useMemo(() => {
    if (!tzParam && (!data || !data[0])) return 0;
    const offset = tzParam || 'UTC+0';
    const hours = parseInt(offset.replace('UTC', '').replace(':00', '')) || 0;
    return hours;
  }, [data, tzParam]);

  const countdown = useCountdownToTimezone(safeTzHours);

  // 🗓 ДОДАННЯ В КАЛЕНДАР
  const addToCalendar = () => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('add_to_calendar_country');
    }

    const country = data?.[0];
    if (!country) return;

    const title = `${t('calendar_titlecountry')} – ${country.CountryName}`;
    const description = `${t('calendar_desc')}\n\nhttps://time2fest.com`;

    const baseDate = ny?.instant instanceof Date ? ny.instant : null;
    if (!baseDate) {
      console.error(
        '❌ No valid New Year date for zone',
        country.CountryName,
        ny
      );
      return;
    }

    // Початок за 15 хв до НР
    const startDate = new Date(baseDate.getTime() - 15 * 60 * 1000);
    // Кінець через 20 хв після
    const endDate = new Date(startDate.getTime() + 20 * 60 * 1000);

    const formatDate = d =>
      d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const start = formatDate(startDate);
    const end = formatDate(endDate);
    const url = 'https://time2fest.com';

    const isApple = /iPhone|iPad|iPod|Macintosh/.test(
      window.navigator.userAgent
    );

    if (isApple) {
      const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
DTSTART:${start}
DTEND:${end}
URL:${url}
END:VEVENT
END:VCALENDAR`.trim();

      const blob = new Blob([icsContent], {
        type: 'text/calendar;charset=utf-8',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'time2fest-reminder.ics';
      link.click();
    } else {
      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
      )}&dates=${start}/${end}&details=${encodeURIComponent(
        description
      )}&location=${encodeURIComponent(url)}&sf=true&output=xml`;

      window.open(googleUrl, '_blank');
    }
  };

  // ---- LOADING ----
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.flagLine}>
                <div
                  className={clsx(
                    styles.countryName,
                    styles.countryNameLoading
                  )}
                >
                  <span className="loading"></span>
                  <div className={clsx(styles.name, 'loading')}></div>
                </div>
                <span
                  className={clsx(styles.utc, styles.utcLoading, 'loading')}
                ></span>
              </div>

              <p className={clsx(styles.desc, styles.descLoading)}>
                <span className="loading"></span>
                <span className="loading"></span>
                <span className="loading"></span>
              </p>

              <div className={clsx(styles.typeBox, styles.typeBoxLoading)}>
                <p
                  className={clsx(
                    styles.typeTitle,
                    styles.typeTitleLoading,
                    'loading'
                  )}
                ></p>
                <ul>
                  <li>
                    <span className="loading"></span>
                    <div className="loading"></div>
                  </li>
                  <li>
                    <span className="loading"></span>
                    <div className="loading"></div>
                  </li>
                  <li>
                    <span className="loading"></span>
                    <div className="loading"></div>
                  </li>
                </ul>
              </div>

              <div
                className={clsx(
                  styles.addBtn,
                  styles.addBtnLoading,
                  'btn_primary',
                  'loading'
                )}
              ></div>
            </div>

            <div className={clsx(styles.imageBlock, styles.imageBlockLoading, 'loading')}></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data || !data[0]) return null;

  const country = data[0];
  const name = country.CountryName;
  const desc = country.ShortDesc || country.ShortDesc;
  const descL = country.CountryDesc || country.CountryDesc;
  const code = country.CountryCode?.toLowerCase();
  const offset = tzParam || 'UTC+0';
  const backgroundUrl = country.Background ? `${import.meta.env.VITE_STRIPE_URL}${country.Background}` : '/country/eve_def.jpg';

  console.log(backgroundUrl)

  // --- Визначення правильного TimezoneDetail за tzParam ---
  const tzWithoutUTC = offset.replace('UTC', '').trim(); // наприклад "+1" або "-5"
  const zoneMatch = Array.isArray(country.TimezoneDetail)
    ? country.TimezoneDetail.find(z => String(z.Zone).trim() === tzWithoutUTC)
    : null;
  const zoneData = zoneMatch || country.TimezoneDetail?.[0] || {};

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          {/* ---- Ліва частина ---- */}
          <div className={styles.info}>
            <div className={styles.flagLine}>
              <div className={styles.countryName}>
                {code && <CircleFlag countryCode={code} height="20" />}
                <h1 className={styles.name}>{name}</h1>
              </div>
              <span className={styles.utc}>{offset}</span>
            </div>

            <p className={styles.desc}>{desc || descL}</p>

            <div className={styles.typeBox}>
              <p className={styles.typeTitle}>{t('controls.types')}:</p>
              <ul>
                <li>
                  <IoTime /> {t('controls.countdown')}
                </li>
                {zoneData.Ambassador && (
                  <li>
                    <IoCamera /> {t('controls.ambass')}
                  </li>
                )}
                {zoneData.VebCamera && (
                  <li>
                    <IoVideocam /> {t('controls.veb')}
                  </li>
                )}
              </ul>
            </div>

            <button
              className={clsx(styles.addBtn, 'btn_primary')}
              onClick={addToCalendar}
            >
              {t('controls.add_to_shel')}
            </button>
          </div>

          {/* ---- Права частина ---- */}
          <div className={styles.imageBlock}>
            <img
              src={backgroundUrl}
              alt={name}
              className={styles.bg}
              loading="lazy"
            />
            <div className={styles.overlay}></div>
            <div className={styles.countdown}>
              <p className={styles.text}>
                {t('controls.ny_at')} {ny.display}
              </p>
              <div className={styles.timer}>
                <span>
                  {countdown.days} <span>{t('days')}</span>
                </span>{' '}
                :{' '}
                <span>
                  {countdown.hours} <span>{t('hours')}</span>
                </span>{' '}
                :{' '}
                <span>
                  {countdown.minutes} <span>{t('minutes')}</span>
                </span>{' '}
                :{' '}
                <span>
                  {countdown.seconds} <span>{t('seconds')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryDetail;
