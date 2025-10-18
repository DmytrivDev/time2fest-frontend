import React from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import styles from './CountryItem.module.scss';

const CountryItem = ({ data, isLoading = false }) => {
  const { t, i18n } = useTranslation();

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

  // Поточна timezone (наприклад "UTC+3")
  const tzCode = time_zones?.[0]?.code || 'UTC+0';
  const code = CountryCode?.toLowerCase() || '';

  // Отримуємо числову частину зони, наприклад "+3" або "-5"
  const currentOffset = tzCode.replace('UTC', '').replace(':00', '').trim();

  // Знаходимо об’єкт з TimezoneDetail, де Zone співпадає з currentOffset
  const currentZone = TimezoneDetail.find(z => {
    if (!z.Zone) return false;

    const zoneNormalized = z.Zone.replace(':00', '').trim();

    // Порівнюємо кілька можливих форматів
    return (
      zoneNormalized === currentOffset ||
      zoneNormalized === currentOffset.replace('+', '') ||
      zoneNormalized === currentOffset.replace('UTC', '')
    );
  });

  const hasCountdown = true;
  const hasAmbassador = !!currentZone?.Ambassador;
  const hasCamera = !!currentZone?.VebCamera;

  // 🔗 Формуємо локалізований шлях
  const localizedPath = `/${i18n.language !== 'en' ? i18n.language + '/' : ''}country/${slug}?tz=${encodeURIComponent(
    tzCode
  )}`;

  return (
    <div className={styles.card}>
      {/* --- Фото --- */}
      <Link to={localizedPath} className={styles.photo}>
        <img src={backgroundUrl} alt={CountryName} loading="lazy" />
        <span className={styles.utc}>{tzCode}</span>
      </Link>

      <div className={styles.content}>
        {/* --- Заголовок --- */}
        <div className={styles.header}>
          {code && <CircleFlag countryCode={code} height="20" />}
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
