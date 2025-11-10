import { useTranslation } from 'react-i18next';
import { CircleFlag } from 'react-circle-flags';
import clsx from 'clsx';

import styles from './ProfileVideo.module.scss';

export default function ProfileVideo({ data, loading, error }) {
  const { t } = useTranslation();

  // ---- 1. Якщо вантажиться ----
  if (loading) {
    return (
      <section className={styles.profileSchd}>
        <div className={styles.headding}>
          <h3 className={clsx(styles.ttl, styles.ttlLoading, 'loading')}></h3>
        </div>

        <div className={styles.content}>
          <div
            className={clsx(
              styles.videoContainer,
              'loading'
            )}
          ></div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  // ---- 3. Якщо дані є ----
  const { CountryCode, Location, VideoID } = data;

  return (
    <section className={styles.profileSchd}>
      <div className={styles.headding}>
        <h3 className={styles.ttl}>
          {t('profile.live_title')}
        </h3>
      </div>

      <div className={styles.content}>
        <div className={styles.videoContainer}>
          <div className={styles.videoPlace}>
            {CountryCode && (
              <CircleFlag countryCode={CountryCode.toLowerCase()} height="20" />
            )}
            {Location && <span>{Location}</span>}
          </div>

          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${VideoID}`}
            title="Live stream"
            frameBorder='0'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
