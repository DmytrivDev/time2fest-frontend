import React from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import styles from './CountryItem.module.scss';

const CountryItem = ({ data, isLoading = false }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  if (isLoading) {
    return <div className={clsx(styles.card, styles.loadingCard, 'loading')} />;
  }

  if (!data) return null;

  const {
    CountryName,
    CountryCode,
    ShortDesc,
    CountryDesc,
    Background,
    TimezoneDetail = [],
    time_zones = [],
    slug,
  } = data;

  const backgroundUrl = Background
    ? `${import.meta.env.VITE_STRIPE_URL}${Background}`
    : '/country/eve_def.jpg';

  const params = new URLSearchParams(location.search);
  const filterTz = params.get('tz'); // якщо обраний пояс

  // ---- Список кодів часових зон ----
  const tzCodeList = Array.isArray(time_zones)
    ? time_zones.map(tz => tz.code)
    : [];

  // ---- Якщо вибрано конкретний пояс ----
  const currentTz = filterTz || tzCodeList[0] || 'UTC+0';
  const currentOffset = currentTz.replace('UTC', '').replace(':00', '').trim();

  // ---- Знаходимо відповідний об'єкт у TimezoneDetail ----
  const currentZone = TimezoneDetail.find(z => {
    if (!z.Zone) return false;
    const zoneNormalized = z.Zone.replace(':00', '').trim();
    return (
      zoneNormalized === currentOffset ||
      zoneNormalized === currentOffset.replace('+', '') ||
      zoneNormalized === currentOffset.replace('UTC', '')
    );
  });

  // ---- Типи святкувань ----
  const hasAmbassador = filterTz
    ? !!currentZone?.Ambassador
    : TimezoneDetail.some(z => z.Ambassador);
  const hasCamera = filterTz
    ? !!currentZone?.VebCamera
    : TimezoneDetail.some(z => z.VebCamera);
  const hasCountdown = true;

  // ---- Локалізований шлях ----
  const localizedPath = `/${
    i18n.language !== 'en' ? i18n.language + '/' : ''
  }country/${slug}?tz=${encodeURIComponent(currentTz)}`;

  return (
    <div className={styles.card}>
      {/* --- Фото --- */}
      <Link to={localizedPath} className={styles.photo}>
        <img src={backgroundUrl} alt={CountryName} loading="lazy" />
        <span className={styles.tzCodeList}>
          {filterTz ? (
            <span className={styles.utc}>{currentTz}</span>
          ) : (
            tzCodeList.map(code => (
              <span key={code} className={styles.utc}>
                {code}
              </span>
            ))
          )}
        </span>
      </Link>

      <div className={styles.content}>
        {/* --- Заголовок --- */}
        <div className={styles.header}>
          {CountryCode && (
            <CircleFlag countryCode={CountryCode.toLowerCase()} height="20" />
          )}
          <h3 className={styles.title}>
            <Link to={localizedPath}>{CountryName}</Link>
          </h3>
        </div>

        {/* --- Типи святкувань --- */}
        <div className={styles.types}>
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
          {hasCountdown && (
            <span className={styles.type}>
              <IoTime /> {t('controls.countdown')}
            </span>
          )}
        </div>

        {/* --- Опис --- */}
        <p className={styles.desc}>{ShortDesc || CountryDesc || ''}</p>

        {/* --- Кнопка --- */}
        <Link to={localizedPath} className={styles.button}>
          {t('controls.details')}
        </Link>
      </div>
    </div>
  );
};

export default CountryItem;
