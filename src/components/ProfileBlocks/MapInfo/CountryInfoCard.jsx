import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import TimerWidget from './TimerWidget';

import styles from './MapInfo.module.scss';

const MapInfo = ({ data, zone, loading, onClose }) => {
  const { t, i18n } = useTranslation('common');

  const utcOffsetStr = useMemo(() => {
    if (zone && zone.toUpperCase().startsWith('UTC')) return zone;
    return 'UTC+0';
  }, [zone]);

  const ny = useMemo(
    () => getNextNYLocalForUtcOffset(utcOffsetStr),
    [utcOffsetStr]
  );

  // --- LOADING SKELETON ---
  if (loading || !data) {
    return (
      <aside className={styles.aside}>
        <button className={styles.close} onClick={onClose}></button>
        <div className={styles.wrap}>
          <div className={clsx(styles.card, styles.cardLoading)}>
            <div className={clsx(styles.photo, 'loading')}></div>

            <div className={styles.header}>
              <div className={clsx(styles.flagLoading, 'loading')}></div>
              <h3 className={clsx(styles.titleLoading, 'loading')}></h3>
            </div>

            <div className={clsx(styles.types, styles.typesLoading)}>
              <span className="loading"></span>
              <span className="loading"></span>
            </div>

            <p className={clsx(styles.desc, styles.descLoading)}>
              <span className="loading"></span>
              <span className="loading"></span>
              <span className="loading"></span>
              <span className="loading"></span>
              <span className="loading"></span>
            </p>

            <div className={clsx(styles.details, styles.detailsLoading, 'loading')}></div>

            <div className={clsx(styles.add, styles.addLoading, 'btn_primary', 'loading')}></div>
          </div>
          <div className={clsx(styles.timerLoading, 'loading')}></div>
        </div>
      </aside>
    );
  }

  // --- NORMAL CONTENT ---
  const {
    CountryName,
    CountryCode,
    ShortDesc,
    CountryDesc,
    Background,
    TimezoneDetail = [],
    time_zones = [],
    slug,
    ambassadors = [],
  } = data;

  const backgroundUrl = Background
    ? `${import.meta.env.VITE_STRIPE_URL}${Background}`
    : '/country/eve_def.jpg';

  const rawZone =
    zone && zone.trim() !== ''
      ? zone
      : Array.isArray(time_zones) && time_zones.length > 0
        ? time_zones[0].code
        : 'UTC+0';

  const currentTz = rawZone.startsWith('UTC')
    ? rawZone
    : `UTC${rawZone.replace('UTC', '')}`;

  const currentOffset = currentTz.replace('UTC', '').replace(':00', '').trim();

  const currentZone = TimezoneDetail.find(z => {
    if (!z.Zone) return false;
    const zoneNormalized = z.Zone.replace(':00', '').trim();
    return (
      zoneNormalized === currentOffset ||
      zoneNormalized === currentOffset.replace('+', '') ||
      zoneNormalized === currentOffset.replace('UTC', '')
    );
  });

  const hasAmbassador = Array.isArray(ambassadors) && ambassadors.length > 0;
  const hasCamera = currentZone?.VebCamera || false;

  const localizedPath = `/${
    i18n.language !== 'en' ? i18n.language + '/' : ''
  }country/${slug}?tz=${encodeURIComponent(currentTz)}`;

  return (
    <aside className={styles.aside}>
      <button className={styles.close} onClick={onClose}></button>
      <div className={styles.wrap}>
        <div className={styles.card}>
          {/* ---- Фото ---- */}
          <div className={styles.photo}>
            <img src={backgroundUrl} alt={CountryName} loading="lazy" />
            <span className={styles.utc}>{currentTz}</span>
          </div>

          {/* ---- Заголовок ---- */}
          <div className={styles.header}>
            {CountryCode && (
              <CircleFlag countryCode={CountryCode.toLowerCase()} height="20" />
            )}
            <h3>{CountryName}</h3>
          </div>

          {/* ---- Теги ---- */}
          <div className={styles.types}>
            <span className={styles.type}>
              <IoTime /> {t('controls.countdown')}
            </span>
            {hasAmbassador && (
              <span className={styles.type}>
                <IoCamera /> {t('controls.ambass')}
              </span>
            )}
            {hasCamera && (
              <span className={styles.type}>
                <IoVideocam /> {t('controls.veb')}
              </span>
            )}
          </div>

          {/* ---- Опис ---- */}
          <p className={styles.desc}>{ShortDesc || CountryDesc || ''}</p>

          {/* ---- Посилання ---- */}
          <Link to={localizedPath} className={styles.details}>
            {t('controls.details')}
          </Link>

          {/* ---- Амбасадори ---- */}
          {hasAmbassador && (
            <div className={styles.ambassadors}>
              <h4 className={styles.ambTitle}>{t('nav.ambassadors')}</h4>
              <div className={styles.ambList}>
                {ambassadors.map((amb, i) => {
                  const photoUrl = amb.photo
                    ? `${import.meta.env.VITE_STRIPE_URL}${amb.photo}`
                    : '/country/amb_def.jpg';
                  return (
                    <Link to="#" key={amb.id || i} className={styles.ambItem}>
                      <span className={styles.ambImg}>
                        <img
                          src={photoUrl}
                          alt={amb.name}
                          className={styles.ambPhoto}
                        />
                      </span>
                      <span className={styles.ambText}>{amb.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---- Кнопка додавання ---- */}
          <button type="button" className={clsx(styles.add, 'btn_primary')}>
            {t('controls.add_to_shel')}
          </button>
        </div>
        <TimerWidget zone={currentTz} />
      </div>
    </aside>
  );
};

export default MapInfo;
