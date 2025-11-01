import React from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import styles from './AmbassadorItem.module.scss';

const AmbassadorItem = ({ data, isLoading = false, isProfile }) => {
  const { t, i18n } = useTranslation();

  const location = useLocation();

  if (isLoading) {
    return (
      <div className={clsx(styles.card, styles.loadingCard, 'loading')}></div>
    );
  }

  if (!data) return null;

  const { name, description, photo, country } = data;
  const countryName = country?.name || '';
  const countryCode = country?.code?.toLowerCase() || '';
  const photoUrl = `${import.meta.env.VITE_STRIPE_URL}${photo}`;

  const profilePath = isProfile ? 'profile/' : '';

  let localizedPath = `/${i18n.language !== 'en' ? i18n.language + '/' : ''}ambassadors/list/` + data.slug;

  if (profilePath) {
    localizedPath = `/${i18n.language !== 'en' ? i18n.language + '/' : ''}${profilePath}ambassadors/` + data.slug;
  }

  return (
    <li className={styles.card}>
      <Link
        to={localizedPath}
        className={styles.photo}
      >
        <img
          src={photoUrl}
          alt={name}
          loading="lazy"
          onError={e => (e.currentTarget.src = '/images/default-avatar.jpg')}
        />
        {countryCode && (
          <span className={styles.countryBadge}>
            <CircleFlag countryCode={countryCode} height="22" />
            <span>{countryName}</span>
          </span>
        )}
      </Link>

      <div className={styles.content}>
        <Link
          to={localizedPath}
          className={styles.name}
        >
          {name}
        </Link>
        <p className={styles.desc}>{description}</p>
        <Link
          to={localizedPath}
          className={styles.button}
        >
          {t('controls.details')}
        </Link>
      </div>
    </li>
  );
};

export default AmbassadorItem;
