import clsx from 'clsx';
import styles from './AboutWhyWe.module.scss';

const AboutWhyWe = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <section
        id="about-whywe"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.header}>
              <div
                className={clsx(styles.loadingTitle, styles.title, 'loading')}
              ></div>
              <div className={clsx(styles.loadingText, styles.text)}>
                <span className="loading"></span>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
            </div>
            <div className={styles.cards}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(styles.card, styles.loadingCard)}
                >
                  <div className={clsx(styles.iconWrapper, styles.iconWrapperLoading, 'loading')} />
                  <div className={clsx(styles.cardContent, styles.cardContentLoading)}>
                    <span className="loading"></span>
                    <span className="loading"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  console.log(data);

  return (
    <section id="about-whywe" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
            {data.Text && <p className={styles.text}>{data.Text}</p>}
          </div>

          <ul className={styles.cards}>
            {data.WhyWeList?.map(item => (
              <li key={item.id} className={styles.card}>
                {item.Icon?.url && (
                  <div className={styles.iconWrapper}>
                    <img
                      src={`${import.meta.env.VITE_STRIPE_URL}${item.Icon.url}`}
                      alt={item.Icon?.alternativeText || item.Name}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <h3>{item.Name}</h3>
                  <p>{item.Desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutWhyWe;
