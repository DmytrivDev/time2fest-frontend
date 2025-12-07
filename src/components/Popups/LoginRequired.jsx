import { useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useLoginPopupStore } from '@/stores/useLoginPopupStore';
import { useTranslation } from 'react-i18next';
import { lockScroll, unlockScroll } from '@/utils/lockScroll';
import { Clock } from 'lucide-react';

import styles from './LoginRequired.module.scss';

export default function LoginRequired() {
  const { t, i18n } = useTranslation();
  const { isOpen, isClosing, closePopup } = useLoginPopupStore();

  // ---- Блокування та розблокування скролу ----
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll(); // Safety при unmount
  }, [isOpen]);

  // ---- Закриття по Escape ----
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape' && isOpen) closePopup();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closePopup]);

  if (!isOpen) return null;

  // ---- Мовний префікс для URL ----
  const langPrefix = i18n.language !== 'en' ? `/${i18n.language}` : '';

  return (
    <div
      className={clsx(styles.popup, isClosing ? styles.closing : styles.open)}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.overlay} onClick={closePopup}></div>

      <div className={styles.window}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <Clock size={18} />
          </div>

          <h3 className={styles.title}>{t('modal.login_required_title')}</h3>

          <div className={styles.buttons}>
            <button
              onClick={closePopup}
              className={clsx(styles.btn, 'btn_primary', 'btn_transp')}
            >
              {t('modal.close')}
            </button>

            <Link
              to={`${langPrefix}/login`}
              className={clsx(styles.btn, 'btn_primary')}
              onClick={closePopup}
            >
              {t('auth.login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
