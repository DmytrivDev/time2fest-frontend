import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { LANGS, DEFAULT_LANG } from '@/i18n/languages';
import styles from './LanguageSelector.module.scss';

// Нормалізація коду мови (en-US -> en)
const normalize = code => (code ? code.split('-')[0] : DEFAULT_LANG);

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Список підтримуваних кодів мов з LANGS
  const SUPPORTED_CODES = useMemo(() => LANGS.map(l => l.code), []);
  const currentCode = normalize(i18n.language);
  const currentLang = LANGS.find(l => l.code === currentCode) || LANGS[0];

  // Побудова локалізованого шляху для обраної мови
  const getLocalizedPath = useCallback(
    targetCode => {
      const { pathname = '/', search = '', hash = '' } = location;

      let segments = pathname.split('/').filter(Boolean);

      // якщо перший сегмент — мова зі списку
      if (segments.length > 0 && SUPPORTED_CODES.includes(segments[0])) {
        segments.shift();
      }

      const basePath = segments.length ? `/${segments.join('/')}` : '';

      // для default lang — завжди без префікса
      if (targetCode === DEFAULT_LANG) {
        return `${basePath || '/'}${search}${hash}`;
      }

      // для інших мов — з префіксом
      return `/${targetCode}${basePath}${search}${hash}`;
    },
    [location, SUPPORTED_CODES]
  );

  const handleSelect = lang => {
    const target = lang.code;
    if (target !== currentCode) {
      i18n.changeLanguage(target);
      navigate(getLocalizedPath(target), { replace: true });
    }
    setOpen(false);
  };

  // Закриття при кліку поза селектором
  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className={clsx(styles.lang__selector, { [styles['is-open']]: open })}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span>{currentLang.label}</span>
        <span>{t('language')}</span>
      </button>

      {open && (
        <ul role="listbox">
          {LANGS.map(l => (
            <li
              key={l.code}
              role="option"
              aria-selected={l.code === currentCode}
              tabIndex={0}
              onClick={() => handleSelect(l)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') handleSelect(l);
              }}
            >
              {l.label}
              <span style={{ opacity: l.code === currentCode ? 1 : 0 }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
