import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Logo from '../common/Logo/Logo';
import SocialLinks from '../common/SocialLinks/SocialLinks';

import styles from './Footer.module.scss';

const Footer = () => {
  const { t, i18n } = useTranslation('common');
  const location = useLocation();

  const isMarginTop =
    location.pathname.includes('/country') ||
    /^\/([a-z]{2})?$/.test(location.pathname) || location.pathname.includes('/about');

  return (
    <footer className={clsx(styles.footer, isMarginTop && styles.marTop)}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.part}>
            <Logo />
          </div>

          <div className={styles.part}>
            <ul className={styles.menu}>
              <li>
                <Link
                  to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}privacy`}
                >
                  {t('nav.policy')}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}terms`}
                >
                  {t('nav.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}agreement`}
                >
                  {t('nav.agreement')}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}disclaimer`}
                >
                  {t('nav.disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.part}>
            <SocialLinks />
          </div>
        </div>
        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Time2Fest. {t('copy')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
