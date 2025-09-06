import { useTranslation } from 'react-i18next';

import Logo from '../common/Logo/Logo';
import SocialLinks from '../common/SocialLinks/SocialLinks';

import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.part}>
            <Logo />
          </div>

          <div className={styles.part}>
            <p>
              © {new Date().getFullYear()} Time2Fest. {t('copy')}.
            </p>
          </div>

          <div className={styles.part}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
