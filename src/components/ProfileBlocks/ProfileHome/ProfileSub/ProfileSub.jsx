import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getValidLocale } from '@/utils/getValidLocale';
import clsx from 'clsx';

import styles from './ProfileSub.module.scss';

export default function ProfilePayments() {
  const { t, i18n } = useTranslation();

  return (
    <section className={styles.profileSub}>
      <div className={styles.subscribe}>
        <div className={styles.subscribeLeft}>
          <h3 className={styles.sebTitle}>Хочете отримати весь контент?</h3>
          <div className={styles.subText}>
            <p>
              Підпишіться і святкуйте разом із нами — усі Нові роки світу в
              одному місці!
            </p>
          </div>
        </div>
        <Link to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}profile/subscription`} className={clsx(styles.srbscribeBtn, 'btn_primary')}>
          Оформити підписку за $5
        </Link>
      </div>
    </section>
  );
}
