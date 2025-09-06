import React, { useState } from 'react';
import Logo from '@/components/common/Logo';
import NavMenu from './NavMenu';
import SocialLinks from '@/components/common/SocialLinks';
import AuthBlock from './AuthBlock';

import styles from './Header.module.scss';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <div className={styles.header__part}>
            <Logo />
            <NavMenu />
          </div>
          <div className={styles.header__part}>
            <SocialLinks />
            <AuthBlock />
            <button
              className="burger"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <NavMenu isMobile />
            <SocialLinks isMobile />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
