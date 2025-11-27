import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

import { useAuth } from '@/hooks/useAuth';
import { userApi } from '@/utils/userApi';

import styles from './ProfileInfo.module.scss';

import ProfileNameCard from './Parts/ProfileNameCard';
import ProfilePasswordCard from './Parts/ProfilePasswordCard';
import ProfileNewsletterCard from './Parts/ProfileNewsletterCard';

export default function ProfileInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 🔹 Беремо дані юзера тільки з useAuth()
  const { user } = useAuth();

  const handleLogout = () => {
    // 1. Видаляємо всі токени
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // 2. Очищаємо axios Authorization header
    delete userApi.defaults.headers.Authorization;

    // 3. Миттєво оновлюємо стан React Query
    queryClient.setQueryData(['authUser'], null);
    queryClient.invalidateQueries(['authUser']);

    // 4. Переходимо на login
    navigate('/login', { replace: true });
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
            <span>{t('profile.logout', 'Вийти')}</span>
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
