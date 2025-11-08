import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { useMediaQuery } from '../../hooks/useMediaQuery';

import ProfileSidebar from './ProfileSidebar';
import HeaderProfile from './HeaderProfile/HeaderProfile';

import styles from './ProfileLayout.module.scss';

export default function ProfileLayout() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const parentContext = useOutletContext();

  const isMobile = useMediaQuery(1140);

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
