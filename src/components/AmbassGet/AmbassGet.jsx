import clsx from 'clsx';

import useFloatingDecors from '../../hooks/useFloatingDecors';
import styles from './AmbassGet.module.scss';

const AmbassGet = ({ data, isLoading, error }) => {
  useFloatingDecors(!isLoading ? `#ambass-get .dec` : null, 20);

  if (isLoading) {
    return (
      <section
        id="ambass-get"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.header}>
              <div
                className={clsx(styles.loadingTitle, styles.title, 'loading')}
              ></div>
              <div className={styles.loadingTestCont}>
                <span className="loading"></span>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
            </div>
            <div className={styles.cardsCont}>
              <div className={styles.cards}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={clsx(styles.card, styles.loadingCard, 'loading')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="ambass-get" className={styles.section}>
      <div className={styles.background}>
        <img src="/public/aboutPage/get_bg.jpg" alt="" />
      </div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
            {data.Text && <p className={styles.text}>{data.Text}</p>}
          </div>

          <div className={styles.cardsCont}>
            <div className={clsx(styles.dec, styles.dec1, 'dec')}></div>
            <div className={clsx(styles.dec3, 'dec')}></div>
            <div className={clsx(styles.dec, styles.dec2, 'dec')}></div>
            <ul className={styles.cards}>
              {data.WhatGetList?.map(item => (
                <li key={item.id} className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <img
                      src={`${import.meta.env.VITE_STRIPE_URL}${item.Icon?.url}`}
                      alt={item.Icon?.alternativeText || item.Name}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{item.Name}</h3>
                    <p>{item.Text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbassGet;
