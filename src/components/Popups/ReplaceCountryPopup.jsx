import { useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { lockScroll, unlockScroll } from '@/utils/lockScroll';
import { AlertTriangle } from 'lucide-react';
import { useReplaceCountryPopupStore } from '@/stores/useReplaceCountryPopupStore';

import styles from './Popup.module.scss';

export default function ReplaceCountryPopup() {
  const { t } = useTranslation();
  const {
    isOpen,
    isClosing,
    oldCountry,
    newCountry,
    zone,
    closePopup,
    replace,
  } = useReplaceCountryPopupStore();

  useEffect(() => {
    if (isOpen) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  if (!isOpen) return null;

  // ---- 🧠 Локалізовані назви незалежно від того, що в сторі ----
  const getName = c =>
    c?.name && !c.name.includes('-') // якщо name НЕ схожий на slug
      ? c.name
      : t(`countries.${c?.slug}`, c?.name || c?.slug);

  const localizedOld = getName(oldCountry);
  const localizedNew = getName(newCountry);

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
            <AlertTriangle size={22} />
          </div>

          <h3 className={styles.title}>{t('modal.replace_country_title')}</h3>

          <p className={styles.text}>
            {t('modal.replace_country_text', {
              country: localizedOld,
              new_country: localizedNew,
              zone,
            })}
          </p>

          <div className={styles.buttons}>
            <button
              onClick={closePopup}
              className={clsx(styles.btn, 'btn_primary', 'btn_transp')}
            >
              {t('modal.close')}
            </button>

            <button
              className={clsx(styles.btn, 'btn_primary')}
              onClick={replace}
            >
              {t('modal.replace')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
