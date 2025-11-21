import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import ProfileSidebar from './ProfileSidebar';
import HeaderProfile from './HeaderProfile/HeaderProfile';

import styles from './ProfileLayout.module.scss';

export default function ProfileLayout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const parentContext = useOutletContext();
  const isMobile = useMediaQuery(1140);

  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const langPrefix = i18n.language === 'en' ? '/' : `/${i18n.language}/`;

  // 🔐 Захист маршруту
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(langPrefix); // редірект на головну мови
    }
  }, [isLoading, isAuthenticated, navigate, langPrefix]);

  // Поки грузиться — показуємо скелетон
  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className="skeleton-block" style={{ height: 40, marginBottom: 20 }}></div>
        <div className="skeleton-block" style={{ height: 300 }}></div>
      </div>
    );
  }

  // Якщо юзер вже редіректиться — нічого не рендеримо
  if (!isAuthenticated) return null;

  return (
    <>
      {isMobile && (
        <HeaderProfile
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      <div className={styles.layout}>
        <ProfileSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className={styles.content}>
          <Outlet context={parentContext} />
        </div>
      </div>
    </>
  );
}
