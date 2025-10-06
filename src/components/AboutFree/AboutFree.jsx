import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { addToCalendar } from '@/utils/addToCalendar';

import styles from './AboutFree.module.scss';

const AboutFree = ({ data, isLoading, error }) => {
  const { t } = useTranslation('common');

  if (isLoading) {
    return (
      <section
        id="about-free"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.header}>
              <div
                className={clsx(styles.loadingTitle, styles.title, 'loading')}
              ></div>
              <div
                className={clsx(styles.loadingText, styles.text, 'loading')}
              ></div>
            </div>
            <div className={styles.cards}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(styles.card, styles.loadingCard, 'loading')}
                />
              ))}
            </div>
            <div className={styles.actions}>
              <div className={clsx(styles.loadingBtn, 'btn_primary loading')} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="about-free" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <img src="/public/aboutPage/free.png" className={styles.dec} alt="" />
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
            {data.Undertitle && (
              <p className={styles.text}>{data.Undertitle}</p>
            )}
          </div>

          <ul className={styles.cards}>
            {data.FreePlanList?.map(item => (
              <li key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {item.Image?.url && (
                    <img
                      src={`${import.meta.env.VITE_STRIPE_URL}${item.Image.url}`}
                      alt={item.Image?.alternativeText || item.Text}
                    />
                  )}
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>{item.Text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button onClick={() => addToCalendar(t)} className="btn_primary">
              {t('hero_btn2')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFree;
