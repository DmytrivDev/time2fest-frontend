import clsx from 'clsx';
import styles from './AboutSteps.module.scss';

const AboutSteps = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <section
        id="about-steps"
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
              <ul className={styles.cards}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className={clsx(styles.card, styles.cardLoading, 'loading')} >
                    <div className={clsx(styles.cardInner, 'loading')}></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="about-steps" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
          </div>

          <div className={styles.cardsCont}>
            <img
              src="/aboutPage/wave2.png"
              className={styles.wave}
              alt=""
            />
            <ul className={styles.cards}>
              {data.StrpsList?.map(item => (
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
        </div>
      </div>
    </section>
  );
};

export default AboutSteps;
