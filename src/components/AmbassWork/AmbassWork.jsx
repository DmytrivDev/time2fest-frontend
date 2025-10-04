import clsx from 'clsx';

import styles from './AmbassWork.module.scss';

const AmbassWork = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <section
        id="ambass-work"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.header}>
              <div
                className={clsx(styles.loadingTitle, styles.title, 'loading')}
              ></div>
              <div
                className={clsx(styles.loadingTest, styles.text, 'loading')}
              ></div>
            </div>
            <div className={styles.cards}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(styles.card, styles.loadingCard, 'loading')}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="ambass-work" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
            {data.Text && <p className={styles.text}>{data.Text}</p>}
          </div>

          <ul className={styles.cards}>
            {data.WhatDoList?.map(item => (
              <li key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={`${import.meta.env.VITE_STRIPE_URL}${item.Image?.url}`}
                    alt={item.Image?.alternativeText || item.Name}
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
    </section>
  );
};

export default AmbassWork;
