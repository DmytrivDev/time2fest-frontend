import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { User } from 'lucide-react';

import styles from './UserMenu.module.scss';

export default function UserMenu() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, isLoading } = useAuth();

  const lang = i18n.language === 'en' ? '' : `${i18n.language}/`;

  if (isLoading) {
    return <div className={clsx(styles.btnLoad, 'btn_small', 'loading')}></div>;
  }

  return isAuthenticated ? (
    <Link
      to={`/${lang}profile`}
      className={clsx('btn_small', styles.loggined, styles.btn)}
    >
      <User size={18} />
      {t('profile.profile')}
    </Link>
  ) : (
    <Link to={`/${lang}login`} className={clsx('btn_small', styles.btn)}>
      {t('log-in')}
    </Link>
  );
}
