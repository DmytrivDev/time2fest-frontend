import clsx from 'clsx';
import { useEffect, useCallback } from 'react';

import { lockScroll, unlockScroll } from '../../utils/lockScroll';

import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, title, children }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      lockScroll(document.body);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
    };
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={clsx(styles.modal, isOpen && styles.open)}>
      <div className={styles.modal__container} onClick={handleOverlayClick}>
        <div className={styles.modal__body}>
          <div className={styles.modal__content}>
            {title && <h2 className={styles.tl}>{title}</h2>}
            <div className={styles.txt}>{children}</div>
          </div>

          <button
            className={clsx(styles.modal__close, 'btn_primary')}
            onClick={onClose}
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
