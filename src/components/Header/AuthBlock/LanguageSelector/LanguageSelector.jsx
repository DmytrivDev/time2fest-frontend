import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LANGS, DEFAULT_LANG } from '@/i18n/languages';

import styles from './LanguageSelector.module.scss';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const currentLang = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  const handleSelect = (l) => {
    if (l.code !== i18n.language) {
      i18n.changeLanguage(l.code);

      const pathWithoutLang = window.location.pathname.replace(/^\/[a-z]{2}/, '');
      const newPath =
        l.code === DEFAULT_LANG ? pathWithoutLang || '/' : `/${l.code}${pathWithoutLang}`;

      navigate(newPath, { replace: true });
    }

    setOpen(false);
  };

  // Закриття при кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.lang__selector} ref={wrapperRef}>
      <button onClick={() => setOpen(!open)} className={open ? styles.opened : ''}>
        {currentLang.label} <span></span>
      </button>
      {open && (
        <ul>
          {LANGS.map((l) => (
            <li key={l.code} onClick={() => handleSelect(l)}>
              {l.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
