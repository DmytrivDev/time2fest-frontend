import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ProfileInfo.module.scss';

import ProfileNameCard from './Parts/ProfileNameCard';
import ProfilePasswordCard from './Parts/ProfilePasswordCard';
import ProfileNewsletterCard from './Parts/ProfileNewsletterCard';

export default function ProfileInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <section className={styles.profileContent}>
      <div className={clsx(styles.column)}>
        <div className={styles.headding}>
          <h1 className={styles.title}>{t('profile.settingsTitle')}</h1>
          <p className={styles.subtitle}>{t('profile.settingsDesc')}</p>
        </div>
      </div>

      <div className={clsx(styles.column)}>
        <div className={clsx(styles.grayPlate, styles.emailPlate)}>
          <div className={styles.email__part}>
            <span>{t('profile.emailAddress')}</span>
            <p className={styles.email}>{user?.email}</p>
          </div>
          <button
            className={clsx('btn_primary', styles.logoutBtn)}
            onClick={handleLogout}
          >
            {t('profile.logout', 'Вийти')}
          </button>
        </div>
      </div>

      <div className={styles.column}>
        <ProfileNameCard user={user} />
        <ProfileNewsletterCard />
      </div>
      <ProfilePasswordCard />
    </section>
  );
}
