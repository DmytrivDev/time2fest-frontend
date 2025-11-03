import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from './CountryAdding.module.scss';

const CountryAdding = ({
  gallery = [],
  description = '',
  nameSec = '',
  isLoading,
  error,
  isProfilePage
}) => { 
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className={clsx(styles.section, isProfilePage && styles.profilePage)}>
        <div className="container">
          <div
            className={clsx(styles.title, styles.titleLoading, 'loading')}
          ></div>
          <div className={styles.content}>
            <div className={styles.imageGrid}>
              <div className={clsx(styles.imageItem, 'loading')}></div>
              <div className={clsx(styles.imageItem, 'loading')}></div>
              <div className={clsx(styles.imageItem, 'loading')}></div>
              <div className={clsx(styles.imageItem, 'loading')}></div>
            </div>
            <div className={styles.textBlock}>
              <h3
                className={clsx(
                  styles.subtitle,
                  styles.subtitleLoading,
                  'loading'
                )}
              ></h3>

              <p className={clsx(styles.desc, styles.descLoading)}>
                <div>
                  <span className="loading"></span>
                  <span className="loading"></span>
                  <span className="loading"></span>
                </div>
                <div>
                  <span className="loading"></span>
                  <span className="loading"></span>
                  <span className="loading"></span>
                </div>
                <div>
                  <span className="loading"></span>
                  <span className="loading"></span>
                </div>
              </p>

              <button
                className={clsx(
                  styles.addBtn,
                  styles.addBtnLoading,
                  'loading',
                  'btn_primary'
                )}
              ></button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !Array.isArray(gallery) || gallery.length === 0) return null;

  // Кнопка додавання у календар (аналогічна до CountryDetail)
  const addToCalendar = () => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('add_to_calendar_country_adding');
    }
    // тут можеш додати логіку календаря або посилання
  };

  return (
    <section className={clsx(styles.section, isProfilePage && styles.profilePage)}>
      <div className="container">
        <h2 className={styles.title}>{t('ambassadors.info_about')} {nameSec}</h2>
        <div className={styles.content}>
          {/* ---- Ліва частина: галерея ---- */}
          <div className={styles.imageGrid}>
            {gallery.slice(0, 4).map((img, i) => (
              <div key={i} className={styles.imageItem}>
                <img
                  src={`${import.meta.env.VITE_STRIPE_URL}${img}`}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* ---- Права частина: текст ---- */}
          <div className={styles.textBlock}>
            <h3 className={styles.subtitle}>
              {t('ambassadors.info_about_celebration')}
            </h3>

            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>

            <button
              className={clsx(styles.addBtn, 'btn_primary')}
              onClick={addToCalendar}
            >
              {t('controls.add_to_shel')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryAdding;
