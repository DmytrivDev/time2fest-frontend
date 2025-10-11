import React, { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CircleFlag } from 'react-circle-flags';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa6';
import styles from './AmbassadorFullItem.module.scss';

const CountryAmbassadorItem = ({
  data,
  nameProp,
  codeProp,
  isLoading = false,
}) => {
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLoading) {
    return <div className={clsx(styles.card, styles.cardLoading, 'loading')}></div>;
  }

  if (!data) return null;

  const { slug, name, description, photo, video, socialLinks } = data;

  const photoUrl = `${import.meta.env.VITE_STRIPE_URL}${photo}`;
  const videoUrl = video ? `${import.meta.env.VITE_STRIPE_URL}${video}` : null;

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.photoWrap}>
          {!isPlaying ? (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className={styles.photoButton}
            >
              <img
                src={photoUrl}
                alt={name}
                loading="lazy"
                onError={e =>
                  (e.currentTarget.src = '/images/default-avatar.jpg')
                }
              />
              {videoUrl && (
                <span className={styles.playBtn}>
                  <span>{t('ambassadors.intro')}</span>
                  <span className={styles.playIcon}></span>
                </span>
              )}
            </button>
          ) : (
            <div className={styles.videoWrap}>
              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                onEnded={() => setIsPlaying(false)}
              ></video>
            </div>
          )}
        </div>
      </div>

      {/* ---- Права частина ---- */}
      <div className={styles.right}>
        <div className={styles.top}>
          {codeProp && (
            <div className={styles.country}>
              <CircleFlag countryCode={codeProp.toLowerCase()} height="20" />
              <span>{nameProp}</span>
            </div>
          )}

          <h3 className={styles.name}>{name}</h3>

          {description && <p className={styles.desc}>{description}</p>}
        </div>

        <div className={styles.actions}>
          <Link
            to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}ambassadors/list/${slug}`}
            className={clsx('btn_primary', 'btn_small', styles.detailsBtn)}
          >
            {t('controls.details')}
          </Link>

          {socialLinks?.length > 0 && (
            <div className={styles.socials}>
              {socialLinks.map(link => {
                const iconName = 'Fa' + link.name;
                const Icon = FaIcons[iconName] || FaIcons.FaGlobe;
                return (
                  <a
                    key={link.name}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className={styles.iconLink}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryAmbassadorItem;
