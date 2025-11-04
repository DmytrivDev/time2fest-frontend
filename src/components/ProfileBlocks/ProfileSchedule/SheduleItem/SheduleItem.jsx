import { useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import { useLocation } from 'react-router-dom';

import styles from './SheduleItem.module.scss';

const SheduleItem = ({ code, isLoading = false, onZoneClick }) => {
  const { t, i18n } = useTranslation();

  const location = useLocation();

  if (isLoading) {
    return (
      <div className={clsx(styles.card, styles.loadingCard, 'loading')}></div>
    );
  }

  const handleZoneClick = () => {
    onZoneClick?.(code); // клік по фону зони
  };

  if (!code) return null;

  const nyDisplay = useMemo(() => {
    try {
      const ny = getNextNYLocalForUtcOffset(code);
      return ny?.display ?? '';
    } catch {
      return '';
    }
  }, [code]);

  return (
    <li className={styles.item}>
      <button className={styles.button} onClick={handleZoneClick}>
        <span className={styles.left}>
          <span>{nyDisplay}</span>
          <span>{code}</span>
        </span>
        <span className={styles.right}>
            Обрати країну
        </span>
      </button>
    </li>
  );
};

export default SheduleItem;
