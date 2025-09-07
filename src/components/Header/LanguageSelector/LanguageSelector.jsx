import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LANGS, DEFAULT_LANG } from '@/i18n/languages';
import clsx from 'clsx';

import styles from './LanguageSelector.module.scss';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const currentLang = LANGS.find(l => l.code === i18n.language) || LANGS[0];

  const handleSelect = l => {
    if (l.code !== i18n.language) {
      i18n.changeLanguage(l.code);

      const pathWithoutLang = window.location.pathname.replace(
        /^\/[a-z]{2}/,
        ''
      );
      const newPath =
        l.code === DEFAULT_LANG
          ? pathWithoutLang || '/'
          : `/${l.code}${pathWithoutLang}`;

      navigate(newPath, { replace: true });
    }

    setOpen(false);
  };

  // Закриття при кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = e => {
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
    <div
      className={clsx(styles.lang__selector, {
        [styles['is-open']]: open,
      })}
      ref={wrapperRef}
    >
      <button onClick={() => setOpen(!open)}>
        <span>{currentLang.label}</span>
        <span>Мова сайту:</span>
      </button>

      <ul>
        {LANGS.map(l => (
          <li key={l.code} onClick={() => handleSelect(l)}>
            {l.label}
            <span
              style={{
                opacity: l.code === i18n.language ? '1' : '0',
              }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
