import { useEffect, useState } from 'react';
import {
  useNavigate,
  useLocation,
  Outlet,
  useOutletContext,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { pathname } = useLocation();

  const langPrefix =
    i18n.language === 'en' ? '/login' : `/${i18n.language}/login`;

  const isInProfile = pathname.includes('/profile');

  // 🔐 Захист маршруту
  useEffect(() => {
    if (!isInProfile) return;

    if (!isLoading && !isAuthenticated) {
      navigate(langPrefix);
    }
  }, [isLoading, isAuthenticated, langPrefix, isInProfile]);

  // Поки йде завантаження — скелет
  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div
          className="skeleton-block"
          style={{ height: 40, marginBottom: 20 }}
        ></div>
        <div className="skeleton-block" style={{ height: 300 }}></div>
      </div>
    );
  }

  // Якщо юзер неавторизований і вже редіректиться
  if (!isAuthenticated && isInProfile) return null;

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
