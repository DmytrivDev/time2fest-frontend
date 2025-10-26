// src/layouts/ProfileLayout/ProfileSidebar.jsx
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/common/Logo/Logo';

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
} from 'lucide-react';

export default function ProfileSidebar() {
  const { t } = useTranslation();

  const links = [
    {
      to: '/profile/dashboard',
      label: t('nav.home'),
      icon: <Home size={18} />,
    },
    {
      to: '/profile/timezones',
      label: t('nav.timezones'),
      icon: <Globe2 size={18} />,
    },
    {
      to: '/profile/schedule',
      label: t('nav.schedule'),
      icon: <Clock size={18} />,
    },
    {
      to: '/profile/countries',
      label: t('nav.countries'),
      icon: <Grid size={18} />,
    },
    {
      to: '/profile/ambassadors',
      label: t('nav.ambassadors'),
      icon: <Users size={18} />,
    },
    {
      to: '/profile/subscription',
      label: t('nav.subscription'),
      icon: <Wallet size={18} />,
    },
    {
      to: '/profile/payments',
      label: t('nav.payments'),
      icon: <CreditCard size={18} />,
    },
  ];

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <nav className={styles.navSidebar}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.userBlock}>
        <User size={18} />
        <span>{user.name || 'Анонімний користувач'}</span>
      </div>
    </aside>
  );
}
