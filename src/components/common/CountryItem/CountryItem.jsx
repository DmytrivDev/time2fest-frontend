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
    return <div className={clsx(styles.card, styles.loading, 'loading')} />;
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

  // Перший timezone для відображення (як UTC)
  const tzCode = time_zones?.[0]?.code || 'UTC+0';
  const code = CountryCode?.toLowerCase() || '';

  // Типи трансляцій
  const zoneData = TimezoneDetail?.[0] || {};
  const hasCountdown = true;
  const hasAmbassador = zoneData.Ambassador;
  const hasCamera = zoneData.VebCamera;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={backgroundUrl} alt={CountryName} loading="lazy" />
        <span className={styles.utc}>{tzCode}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          {code && <CircleFlag countryCode={code} height="20" />}
          <h3 className={styles.title}>{CountryName}</h3>
        </div>

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

        <p className={styles.desc}>{ShortDesc || CountryDesc || ''}</p>

        <button className={clsx(styles.addBtn, 'btn_primary')}>
          {t('controls.add_to_shel')}
        </button>

        <Link
          to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}countries/${slug}`}
          className={styles.details}
        >
          {t('controls.details')}
        </Link>
      </div>
    </div>
  );
};

export default CountryItem;
