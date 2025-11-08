import clsx from 'clsx';
import Logo from '../../../components/common/Logo/Logo';

import { User } from 'lucide-react';

import styles from './HeaderProfile.module.scss';

export default function HeaderProfile({ isMobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__body}>
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className={clsx(styles.burger, {
            [styles['is-open']]: isMobileMenuOpen,
          })}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={styles.header__logo}>
          <Logo />
        </div>

        <div className={styles.account}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
