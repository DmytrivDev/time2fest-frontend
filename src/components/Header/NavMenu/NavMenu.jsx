import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@/i18n/languages';

import styles from './NavMenu.module.scss';

const links = [
  { to: '/#new-year', i18n: 'nav.newYear' },
  { to: '/#about', i18n: 'nav.about' },
  { to: '/ambassadors', i18n: 'nav.aboutAmbass' },
  { to: '/#faq', i18n: 'nav.faq' },
];

const NavMenu = ({ setMobileMenuOpen }) => {
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = i18n.language.split('-')[0];
  const langPrefix =
    currentLang !== DEFAULT_LANG && SUPPORTED_LANGS.includes(currentLang)
      ? `/${currentLang}`
      : '';

  const smoothScrollToHash = hash => {
    const id = hash.replace('#', '');
    const el = document.getElementById(id);

    if (el) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const isMobile = window.innerWidth < 1140;
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        (isMobile ? headerHeight : 0);
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Прибираємо мовний префікс з pathname
  const stripLangPrefix = pathname => {
    const parts = pathname.split('/');
    if (SUPPORTED_LANGS.includes(parts[1])) {
      return '/' + parts.slice(2).join('/');
    }
    return pathname;
  };

  const handleClick = (e, link) => {
    e.preventDefault();
    const [path, hash] = link.split('#');

    const targetPath = `${langPrefix}${path}`;
    const targetFull = hash ? `${targetPath}#${hash}` : targetPath;

    if (stripLangPrefix(location.pathname) === path && hash) {
      smoothScrollToHash(`#${hash}`);
    } else {
      navigate(targetFull);
    }

    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => smoothScrollToHash(location.hash), 50);
    }
  }, [location]);

  return (
    <nav className={styles.navmenu}>
      <ul>
        {links.map(({ to, i18n }) => (
          <li key={to}>
            <a href={to} onClick={e => handleClick(e, to)}>
              {t(i18n)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
