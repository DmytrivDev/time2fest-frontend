import { useTranslation } from 'react-i18next';
import { CircleFlag } from 'react-circle-flags';
import { api } from '@/utils/api';
import clsx from 'clsx';

import styles from './ProfileVideo.module.scss';

export default function ProfileSoon() {
  const { t } = useTranslation();

  return (
    <section className={styles.profileSchd}>
      <div className={styles.headding}>
        <h3 className={styles.ttl}>Зараз в ефірі</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.videoContainer}>
          <div className={styles.videoPlace}>
            <CircleFlag countryCode={'br'} height="20" />
            <span>Бразилія, Ріо</span>
          </div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/CHHJ7hhNH9Q?si=jPu2omENAh3zBMm4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
