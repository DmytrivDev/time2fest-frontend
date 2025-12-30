import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import { useCountdownToTimezone } from '../../hooks/useKiritimatiNYCountdown';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import { useAuth } from '@/hooks/useAuth';
import { useLoginPopupStore } from '@/stores/useLoginPopupStore';
import { useSubPopupStore } from '@/stores/useSubPopupStore';
import { useCountryTranslationsAvailable } from '@/hooks/useCountryTranslationsAvailable';
import { useCountryLiveAvailable } from '@/hooks/useCountryLiveAvailable';

import { useScheduleToggle } from '@/hooks/useScheduleToggle';

import styles from './CountryDetail.module.scss';

const CountryDetail = ({ data, isLoading, error, tzParam, isProfilePage }) => {
  const { t } = useTranslation();
  const { isAuthenticated, isPremium } = useAuth();
  const openLoginPopup = useLoginPopupStore(s => s.openPopup);
  const openSubPopup = useSubPopupStore(s => s.openPopup);

  //
  // =============== 1. НОРМАЛІЗАЦІЯ UTC ===============
  //
  const utcOffsetStr = useMemo(() => {
    if (tzParam?.toUpperCase?.().startsWith('UTC')) return tzParam;
    return 'UTC+0';
  }, [tzParam]);

  const ny = useMemo(
    () => getNextNYLocalForUtcOffset(utcOffsetStr),
    [utcOffsetStr]
  );

  const safeTzHours = useMemo(() => {
    const offset = tzParam || 'UTC+0';
    return parseInt(offset.replace('UTC', '').replace(':00', '')) || 0;
  }, [tzParam]);

  const countdown = useCountdownToTimezone(safeTzHours);

  //
  // =============== 2. LOADING STATE ===============
  //
  if (isLoading) {
    return (
      <section
        className={clsx(styles.section, isProfilePage && styles.profilePage)}
      >
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

            <div
              className={clsx(
                styles.imageBlock,
                styles.imageBlockLoading,
                'loading'
              )}
            ></div>
          </div>
        </div>
      </section>
    );
  }

  //
  // =============== 3. НЕТ ДАНИХ ===============
  //
  if (error || !data || !data[0]) return null;

  const country = data[0];
  const name = country.CountryName;
  const desc = country.ShortDesc || country.CountryDesc;
  const code = country.CountryCode?.toLowerCase();
  const offset = tzParam || 'UTC+0';
  const backgroundUrl = country.Background
    ? `${import.meta.env.VITE_STRIPE_URL}${country.Background}`
    : '/country/eve_def.jpg';

  const { hasTranslations: hasCamera } = useCountryTranslationsAvailable({
    slug: country.slug,
    timezone: utcOffsetStr,
  });

  const { hasLive: hasAmbassador } = useCountryLiveAvailable({
    slug: country.slug,
    timezone: utcOffsetStr,
  });

  //
  // =============== 5. ДОДАВАННЯ В ГРАФІК (новий хук!) ===============
  //

  const { isAdded, handleToggle } = useScheduleToggle({
    slug: country.slug,
    code: code,
    zone: utcOffsetStr,
  });

  //
  // =============== 6. RETURN VIEW ===============
  //
  return (
    <section
      className={clsx(styles.section, isProfilePage && styles.profilePage)}
    >
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

            <p className={styles.desc}>{desc}</p>

            <div className={styles.typeBox}>
              <p className={styles.typeTitle}>{t('controls.types')}:</p>
              <ul>
                <li>
                  <IoTime /> {t('controls.countdown')}
                </li>
                {hasAmbassador && (
                  <li>
                    <IoCamera /> {t('controls.ambass')}
                  </li>
                )}
                {hasCamera && (
                  <li>
                    <IoVideocam /> {t('controls.veb')}
                  </li>
                )}
              </ul>
            </div>

            {/* === НОВА КНОПКА "ДОДАТИ В ГРАФІК" === */}
            <button
              className={clsx(
                styles.addBtn,
                'btn_primary plus',
                isAdded && 'added'
              )}
              onClick={() => {
                if (!isAuthenticated) {
                  openLoginPopup();
                  return;
                }
                if (!isPremium) {
                  openSubPopup();
                  return;
                }
                handleToggle();
              }}
            >
              {isAdded ? t('profile.added') : t('nav.addshelb')}
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
