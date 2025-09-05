import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './HeroCountdown.module.scss';

const pad2 = n => String(n ?? 0).padStart(2, '0');

const HeroCountdown = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.hero_right}>
      <img
        className="conBg"
        alt="Circle"
        src="/hero/circle.svg"
        fetchpriority="high"
        decoding="async"
      />
      <picture>
        <source srcSet="/hero/top.avif" type="image/avif" />
        <source srcSet="/hero/top.webp" type="image/webp" />
        <img
          src="/hero/top.png"
          className={styles.hero_top}
          alt="Top decoration"
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className={styles.hero__circinner}>
        <p className={styles.hero__label}>{t('hero__timertitle')}</p>
        <div className={styles.hero__timer}>
          <span>
            <strong>{days}</strong>
            <small>{t('days')}</small>
          </span>{' '}
          <small>:</small>
          <span>
            {/* години/хвилини/секунди падимо до 2 знаків */}
            <strong>{pad2(hours)}</strong>
            <small>{t('hours')}</small>
          </span>{' '}
          <small>:</small>
          <span>
            <strong>{pad2(minutes)}</strong>
            <small>{t('minutes')}</small>
          </span>{' '}
          <small>:</small>
          <span>
            <strong>{pad2(seconds)}</strong>
            <small>{t('seconds')}</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroCountdown;
