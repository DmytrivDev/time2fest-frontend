import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { addToCalendar } from '@/utils/addToCalendar';
import { Link } from 'react-router-dom';

import useFloatingDecors from '../../hooks/useFloatingDecors';
import RotatingGlobe from './RotatingGlobe';

import styles from './AboutHero.module.scss';

const AboutHero = ({ data, isLoading, error }) => {
  const { t, i18n } = useTranslation('common');

  useFloatingDecors(!isLoading ? `#about-hero .dec` : null, 20);

  if (isLoading) {
    return (
      <section className={clsx(styles.section, styles.sectionLoading)}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.leftpart}>
              <span className={clsx(styles.loadingTag, 'loading')}></span>
              <div className={styles.loadingTitleCont}>
                <span className={clsx(styles.loadingTitle, 'loading')}></span>
              </div>
              <div className={styles.loadingSubtitleCont}>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
              <div className={styles.loadingTextCont}>
                <span className="loading"></span>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
              <div className={styles.actions}>
                <div
                  className={clsx(styles.loadingBtn, 'btn_primary loading')}
                />
                <div
                  className={clsx(styles.loadingBtn, 'btn_primary loading')}
                />
              </div>
            </div>
            <div className={styles.rightpartLoading}>
              <span className="loading"></span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="about-hero" className={styles.section}>
      <div className={styles.aboutDeccont}>
        <div className={clsx(styles.dec, 'dec')}></div>
        <div className={clsx(styles.dec, 'dec')}></div>
      </div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.leftpart}>
            {data.Tag && (
              <span className={styles.tag}>
                {data.Icon?.url && (
                  <img
                    src={`${import.meta.env.VITE_STRIPE_URL}${data.Icon.url}`}
                    alt={data.Icon.alternativeText || ''}
                    className={styles.tagIcon}
                  />
                )}
                {data.Tag}
              </span>
            )}

            {data.Title && <h1 className={styles.title}>{data.Title}</h1>}

            {data.Undertitle && (
              <h2 className={styles.undertitle}>{data.Undertitle}</h2>
            )}

            {data.Text && <p className={styles.text}>{data.Text}</p>}

            <div className={styles.actions}>
              <button onClick={() => addToCalendar(t)} className="btn_primary">
                {t('hero_btn2')}
              </button>
              <Link
                to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}#new-year`}
                className="btn_transp"
              >
                {t('hero_btn1')}
              </Link>
            </div>
          </div>
          <div className={styles.rightPart}>
            <RotatingGlobe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
