import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Logo.module.scss';

const Logo = () => {
  const { i18n } = useTranslation();

  return (
    <Link
      to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}`}
      className={styles.logo}
    >
      <img src="/logo.svg" alt="TIME2FEST" />
    </Link>
  );
};

export default Logo;
