import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getValidLocale } from '@/utils/getValidLocale'; // ✅ додаємо, якщо ще не було
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
  const locale = getValidLocale(); // ✅ поточна мова

  // Динамічний префікс для URL
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  const links = [
    {
      to: `${localePrefix}/profile/dashboard`,
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
