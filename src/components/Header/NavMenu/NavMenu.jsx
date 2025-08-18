import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGS } from '@/i18n/languages'; // твій файл з мовами
import styles from './NavMenu.module.scss';

const links = [
  { to: '/#new-year', i18n: 'nav.newYear' },
  { to: '/#about', i18n: 'nav.about' },
  { to: '/#become-streamer', i18n: 'nav.becomeStreamer' },
  { to: '/#faq', i18n: 'nav.faq' },
];

const NavMenu = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();

  const smoothScrollToHash = (hash) => {
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Прибираємо мовний префікс з pathname
  const stripLangPrefix = (pathname) => {
    const parts = pathname.split('/');
    if (SUPPORTED_LANGS.includes(parts[1])) {
      return '/' + parts.slice(2).join('/');
    }
    return pathname;
  };

  const handleClick = (e, link) => {
    e.preventDefault();
    const [path, hash] = link.split('#');

    if (stripLangPrefix(location.pathname) === path) {
      smoothScrollToHash(`#${hash}`);
    } else {
      navigate(link);
    }
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        smoothScrollToHash(location.hash);
      }, 50);
    }
  }, [location]);

  return (
    <nav>
      <ul className={styles.nav__ist}>
        {links.map(({ to, i18n }) => (
          <li key={to}>
            <a href={to} onClick={(e) => handleClick(e, to)} className={styles.nav__link}>
              {t(i18n)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
