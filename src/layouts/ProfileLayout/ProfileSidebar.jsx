import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { getValidLocale } from '@/utils/getValidLocale';

import Logo from '../../components/common/Logo/Logo';
import LanguageProfile from './LanguageProfile';

import styles from './ProfileLayout.module.scss';

import {
  Home,
  Globe2,
  Clock,
  Grid,
  Users,
  CreditCard,
  Wallet,
  User,
  Languages,
} from 'lucide-react';

export default function ProfileSidebar({
  isMobileMenuOpen,
  setMobileMenuOpen,
}) {
  const { t } = useTranslation();
  const locale = getValidLocale(); // ✅ поточна мова

  // Динамічний префікс для URL
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  const links = [
    {
      to: `${localePrefix}/profile`,
      label: t('nav.home'),
      icon: <Home size={18} />,
    },
    {
      to: `${localePrefix}/profile/timezones`,
      label: t('nav.timezones'),
      icon: <Globe2 size={18} />,
    },
    {
      to: `${localePrefix}/profile/schedule`,
      label: t('nav.schedule'),
      icon: <Clock size={18} />,
    },
    {
      to: `${localePrefix}/profile/countries`,
      label: t('nav.countries'),
      icon: <Grid size={18} />,
    },
    {
      to: `${localePrefix}/profile/ambassadors`,
      label: t('nav.ambassadors'),
      icon: <Users size={18} />,
    },
    {
      to: `${localePrefix}/profile/subscription`,
      label: t('nav.subscription'),
      icon: <Wallet size={18} />,
    },
    {
      to: `${localePrefix}/profile/payments`,
      label: t('nav.payments'),
      icon: <CreditCard size={18} />,
    },
  ];

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <aside
      className={clsx(styles.sidebar, {
        [styles['is-open']]: isMobileMenuOpen,
      })}
    >
      <div
        className={styles.overlay}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      <div className={styles.logo}>
        <Logo />

        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className={styles.sidebar__close}
        ></button>
      </div>

      <nav className={styles.navSidebar}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === `${localePrefix}/profile`} // ⬅️ exact match тільки для головної
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.sidebar__bottom}>
        <LanguageProfile languages={Languages} />
        <Link to="info" className={styles.userBlock}>
          <User size={18} />
          <span>{user.name || 'Anonim'}</span>
        </Link>
      </div>
    </aside>
  );
}
