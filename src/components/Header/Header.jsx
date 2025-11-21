import { useState } from 'react';
import clsx from 'clsx';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useVh } from '../../hooks/useVh';

import Logo from '../common/Logo/Logo';
import SocialLinks from '../common/SocialLinks/SocialLinks';

import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import LanguageSelector from './LanguageSelector';
import MobMenu from './MobMenu/MobMenu';

import styles from './Header.module.scss';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = useMediaQuery(1140);

  useVh();

  return (
    <header
      className={clsx(styles.header, {
        [styles['is-open']]: isMobileMenuOpen,
      })}
    >
      <div className={styles.header__main}>
        <div className="container">
          <div className={styles.header__body}>
            <Logo />

            {!isMobile && <NavMenu />}

            {!isMobile && <SocialLinks />}

            <div className={styles.header__actions}>
              <UserMenu />

              {!isMobile && <LanguageSelector />}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className={clsx(styles.burger, {
                  [styles['is-open']]: isMobileMenuOpen,
                })}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
};

export default Header;
