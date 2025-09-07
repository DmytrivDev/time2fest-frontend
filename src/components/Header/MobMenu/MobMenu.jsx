import { useEffect } from 'react';
import clsx from 'clsx';

import { lockScroll, unlockScroll } from '../../../utils/lockScroll';

import NavMenu from '../NavMenu';
import LanguageSelector from '../LanguageSelector';
import SocialLinks from '../../common/SocialLinks/SocialLinks';

import styles from './MobMenu.module.scss';

const MobMenu = ({ isMobileMenuOpen, setMobileMenuOpen }) => {
  const menuBody = document.querySelector(`.${styles.mobmenu}`);

  useEffect(() => {
    if (isMobileMenuOpen) {
      lockScroll(menuBody);
    } else {
      unlockScroll();
    }
  }, [isMobileMenuOpen]);

  return (
    <div
      className={clsx(styles.mobmenu, {
        [styles['is-open']]: isMobileMenuOpen,
      })}
    >
      <div className={styles.mobmenu__body}>
        <div className={styles.mobmenu__container}>
          <div className={styles.mobmenu__content}>
            <NavMenu setMobileMenuOpen={setMobileMenuOpen} />
            <SocialLinks />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobMenu;
