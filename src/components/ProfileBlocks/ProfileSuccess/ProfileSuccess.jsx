import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { getValidLocale } from '@/utils/getValidLocale';

import styles from './ProfileSuccess.module.scss';

export default function ProfileSuccess() {
  const { t, i18n } = useTranslation();

  const locale = getValidLocale(i18n.language);
  const prefix = locale !== 'en' ? `/${locale}` : '';

  return (
    <div className={styles.profileContent}>
      <div className={styles.success}>
        <div className={styles.success__body}>
          <span className={styles.ico}>
            <img src="/success/success.svg" alt="" />
          </span>

          <h4 className={styles.title}>{t('payment.success_title')}</h4>

          <div className={styles.text}>
            <p>{t('payment.success_text')}</p>
          </div>

          <Link
            to={`${prefix}/profile/schedule`}
            className={clsx(styles.btn, 'btn_primary')}
          >
            {t('payment.success_button')}
          </Link>
        </div>
      </div>
    </div>
  );
}
