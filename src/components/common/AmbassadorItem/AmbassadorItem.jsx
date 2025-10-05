import React from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import styles from './AmbassadorItem.module.scss';

const AmbassadorItem = ({ data, isLoading = false }) => {
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

  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <img
          src={photoUrl}
          alt={name}
          loading="lazy"
          onError={e => (e.currentTarget.src = '/images/default-avatar.jpg')}
        />
        {countryCode && (
          <div className={styles.countryBadge}>
            <CircleFlag countryCode={countryCode} height="22" />
            <span>{countryName}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.desc}>{description}</p>
        <button className={styles.button}>Детальніше</button>
      </div>
    </div>
  );
};

export default AmbassadorItem;
