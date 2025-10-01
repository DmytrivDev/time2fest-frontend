import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useFloatingDecors from '../../hooks/useFloatingDecors';
import styles from './AmbassHero.module.scss';

import girlImage from '../../assets/become/video.mp4';

const AmbassHero = ({ data, isLoading, error }) => {
  const { t } = useTranslation('common');

  useFloatingDecors(!isLoading ? `#ambass-hero .dec` : null, 10);

  const [hasError, setHasError] = useState(false);

  if (isLoading) {
    return (
      <section
        id="ambass-hero"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.leftpart}>
              <span className={clsx(styles.loadingTag, 'loading')}></span>
              <div className={styles.loadingTitleCont}>
                <span className={clsx(styles.loadingTitle, 'loading')}></span>
              </div>
              <div className={styles.loadingTestCont}>
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
            <div className={styles.heroListCont}>
              <ul className={styles.heroList}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className={clsx(styles.loadingItem, 'loading')} />
                ))}
              </ul>
            </div>
            <div
              className={clsx(styles.imageWrapper, hasError && styles.noimage)}
            ></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="ambass-hero" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.leftpart}>
            {data.Tag && <span className={styles.tag}>{data.Tag}</span>}

            <h1 className={styles.title}>
              {data.Title?.split('\n').map((line, idx) => (
                <span key={idx}>{line}</span>
              ))}
            </h1>

            {data.Text && <p className={styles.text}>{data.Text}</p>}

            <div className={styles.actions}>
              <a href="#form" className="btn_primary">
                {t('nav.becomeStreamer')}
              </a>
            </div>
            <div className={clsx(styles.dec, 'dec')}></div>
          </div>

          {/* Hero list */}
          <div className={styles.heroListCont}>
            <div className={clsx(styles.dec, 'dec')}></div>
            <ul className={styles.heroList}>
              {data.HeroList?.map(item => (
                <li key={item.id} className={styles.heroItem}>
                  <h3>{item.Name}</h3>
                  <p>{item.Text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={clsx(styles.imageWrapper, hasError && styles.noimage)}
          >
            <div>
              <video
                src={girlImage}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setHasError(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbassHero;
