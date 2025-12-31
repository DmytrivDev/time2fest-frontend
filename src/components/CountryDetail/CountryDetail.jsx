import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';

import { useCountdownToTimezone } from '../../hooks/useKiritimatiNYCountdown';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import { parseUtcOffset } from '@/utils/parseUtcOffset';

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
  // =============== 1. NORMALIZE ZONE ID ===============
  //
  const zoneId = useMemo(() => {
    if (typeof tzParam === 'string' && tzParam.toUpperCase().startsWith('UTC')) {
      return tzParam;
    }
    return 'UTC+0';
  }, [tzParam]);

  //
  // =============== 2. PARSE OFFSET (FLOAT!) ===============
  //
  const zoneOffset = useMemo(() => {
    return parseUtcOffset(zoneId) ?? 0;
  }, [zoneId]);

  //
  // =============== 3. NEW YEAR TIME & COUNTDOWN ===============
  //
  const ny = useMemo(
    () => getNextNYLocalForUtcOffset(zoneId),
    [zoneId]
  );

  const countdown = useCountdownToTimezone(zoneOffset);

  //
  // =============== 4. LOADING / EMPTY STATES ===============
  //
  if (isLoading) {
    return (
      <section className={clsx(styles.section, isProfilePage && styles.profilePage)}>
        <div className="container">
          <div className={styles.content}>
            <div className={clsx(styles.info, 'loading')} />
            <div className={clsx(styles.imageBlock, 'loading')} />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.[0]) return null;

  //
  // =============== 5. DATA ===============
  //
  const country = data[0];
  const name = country.CountryName;
  const desc = country.ShortDesc || country.CountryDesc;
  const code = country.CountryCode?.toLowerCase();

  const backgroundUrl = country.Background
    ? `${import.meta.env.VITE_STRIPE_URL}${country.Background}`
    : '/country/eve_def.jpg';

  const { hasTranslations } = useCountryTranslationsAvailable({
    slug: country.slug,
    timezone: zoneId,
  });

  const { hasLive } = useCountryLiveAvailable({
    slug: country.slug,
    timezone: zoneId,
  });

  const { isAdded, handleToggle } = useScheduleToggle({
    slug: country.slug,
    code,
    zone: zoneId,
  });

  //
  // =============== 6. RENDER ===============
  //
  return (
    <section className={clsx(styles.section, isProfilePage && styles.profilePage)}>
      <div className="container">
        <div className={styles.content}>

          {/* ---- LEFT ---- */}
          <div className={styles.info}>
            <div className={styles.flagLine}>
              <div className={styles.countryName}>
                {code && <CircleFlag countryCode={code} height="20" />}
                <h1 className={styles.name}>{name}</h1>
              </div>
              <span className={styles.utc}>{zoneId}</span>
            </div>

            <p className={styles.desc}>{desc}</p>

            <div className={styles.typeBox}>
              <p className={styles.typeTitle}>{t('controls.types')}:</p>
              <ul>
                <li><IoTime /> {t('controls.countdown')}</li>
                {hasLive && <li><IoCamera /> {t('controls.ambass')}</li>}
                {hasTranslations && <li><IoVideocam /> {t('controls.veb')}</li>}
              </ul>
            </div>

            <button
              className={clsx(styles.addBtn, 'btn_primary plus', isAdded && 'added')}
              onClick={() => {
                if (!isAuthenticated) return openLoginPopup();
                if (!isPremium) return openSubPopup();
                handleToggle();
              }}
            >
              {isAdded ? t('profile.added') : t('nav.addshelb')}
            </button>
          </div>

          {/* ---- RIGHT ---- */}
          <div className={styles.imageBlock}>
            <img
              src={backgroundUrl}
              alt={name}
              className={styles.bg}
              loading="lazy"
            />
            <div className={styles.overlay} />

            <div className={styles.countdown}>
              <p className={styles.text}>
                {t('controls.ny_at')} {ny.display}
              </p>

              <div className={styles.timer}>
                <span>{countdown.days} <span>{t('days')}</span></span> :
                <span>{countdown.hours} <span>{t('hours')}</span></span> :
                <span>{countdown.minutes} <span>{t('minutes')}</span></span> :
                <span>{countdown.seconds} <span>{t('seconds')}</span></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CountryDetail;
