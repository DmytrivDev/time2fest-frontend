import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import useFloatingDecors from '../../hooks/useFloatingDecors';
import { Link } from 'react-router-dom';
import { addToCalendar } from '@/utils/addToCalendar';

import styles from './AboutCTO.module.scss';

const AboutCto = ({ data, isLoading, error }) => {
  const { t, i18n } = useTranslation('common');
  const lang = i18n.language === 'en' ? '' : `${i18n.language}/`;

  useFloatingDecors(!isLoading ? `#about-cto .dec` : null, 20);

  if (isLoading) {
    return (
      <section className={clsx(styles.section, styles.sectionLoading)}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.left}>
              <div
                className={clsx(styles.loadingTitle, styles.title1, 'loading')}
              />
              <div className={clsx(styles.loadingTitle, styles.title2)}>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
              <div className={clsx(styles.loadingText, styles.text)}>
                <span className="loading"></span>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
              <div className={styles.actions}>
                <div
                  className={clsx(styles.loadingBtn, 'btn_primary loading')}
                />
              </div>
            </div>
            <div className={styles.right}>
              <div className={clsx(styles.loadingImage, 'loading')} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="about-cto" className={styles.section}>
      <div className={clsx(styles.dec, styles.dec1, 'dec')}></div>
      <div className={clsx(styles.dec3, 'dec')}></div>
      <div className={clsx(styles.dec, styles.dec2, 'dec')}></div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.left}>
            {data.Title1 && <h2 className={styles.title1}>{data.Title1}</h2>}
            {data.Title2 && <h3 className={styles.title2}>{data.Title2}</h3>}
            {data.Text && <p className={styles.text}>{data.Text}</p>}

            <div className={styles.actions}>
              <Link to={`/${lang}login`} className="btn_primary">
                {t('auth.login')}
              </Link>
            </div>
          </div>

          {/* Права частина */}
          <div className={styles.right}>
            {data.Image?.url && (
              <img
                src={`${import.meta.env.VITE_STRIPE_URL}${data.Image.url}`}
                alt={data.Image?.alternativeText || 'map'}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCto;
