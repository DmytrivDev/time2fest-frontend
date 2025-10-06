import clsx from 'clsx';
import useFloatingDecors from '../../hooks/useFloatingDecors';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import styles from './AmbassBecome.module.scss';

const AmbassBecome = ({ data, isLoading, error }) => {
  const { t, i18n } = useTranslation('common');

  const location = useLocation();

  useFloatingDecors(!isLoading ? `#ambass-become .dec` : null, 20);

  if (isLoading) {
    return (
      <section
        id="ambass-become"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.header}>
              <div
                className={clsx(styles.loadingTitle, styles.title, 'loading')}
              ></div>
            </div>
            <div className={styles.cardsCont}>
              <div className={styles.cards}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={clsx(styles.card)}>
                    <div className={clsx(styles.cardInner, 'loading')}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={clsx(styles.loadingBtn, 'btn_primary loading')} />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="ambass-become" className={styles.section}>
      <div className={clsx(styles.background, 'dec')}>
        <img src="/public/aboutPage/stars.png" alt="" />
      </div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
          </div>

          <div className={styles.cardsCont}>
            <div className={clsx(styles.dec, 'dec')}></div>
            <div className={clsx(styles.dec2, 'dec')}></div>
            <img
              src="/public/aboutPage/wave.png"
              className={styles.wave}
              alt=""
            />
            <ul className={styles.cards}>
              {data.WhatBecomeList?.map(item => (
                <li key={item.id} className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.iconWrapper}>
                      <img
                        src={`${import.meta.env.VITE_STRIPE_URL}${item.Icon?.url}`}
                        alt={item.Icon?.alternativeText || 'icon'}
                      />
                    </div>
                    <p className={styles.text}>{item.Text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <Link
              to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}become-ambassador`}
              className="btn_primary"
            >
              {t('join')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbassBecome;
