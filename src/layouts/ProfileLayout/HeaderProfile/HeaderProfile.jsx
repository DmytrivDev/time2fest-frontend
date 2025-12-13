import clsx from 'clsx';
import Logo from '../../../components/common/Logo/Logo';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { User } from 'lucide-react';

import styles from './HeaderProfile.module.scss';

export default function HeaderProfile({ isMobileMenuOpen, setMobileMenuOpen }) {
  const { i18n } = useTranslation('common');

  const profPath = `/${
    i18n.language !== 'en' ? i18n.language + '/' : ''
  }profile/info`;

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

        <Link to={profPath} className={styles.account}>
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}
