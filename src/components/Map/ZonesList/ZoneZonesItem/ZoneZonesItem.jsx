import { useMemo } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';

import styles from './ZoneZonesItem.module.scss';

export default function ZoneZonesItem({ id, code, countryCodes = [], onClick }) {
  const { t } = useTranslation('common');

  // Безпечне отримання рядка часу
  const nyDisplay = useMemo(() => {
    try {
      const ny = getNextNYLocalForUtcOffset(code);
      return ny?.display ?? '';
    } catch {
      return '';
    }
  }, [code]);

  const MAX_FLAGS = 5;

  // Нормалізуємо: масив → toLowerCase → лише 2-літерні коди
  const normalized = useMemo(() => {
    const list = Array.isArray(countryCodes) ? countryCodes : [];
    const twoLetter = list
      .filter(Boolean)
      .map((cc) => String(cc).toLowerCase())
      .filter((cc) => /^[a-z]{2}$/.test(cc));
    return {
      visible: twoLetter.slice(0, MAX_FLAGS),
      hiddenCount: Math.max(twoLetter.length - MAX_FLAGS, 0),
    };
  }, [countryCodes]);

  return (
    <button
      type="button"
      onClick={() => onClick?.(code)}
      className={styles.zoneItem}
      aria-label={`Open ${code}`}
      data-id={id}
    >
      {/* Ліворуч: код та прапори */}
      <div className={styles.itemLeft}>
        <strong>{code}</strong>

        {normalized.visible.length > 0 && (
          <div className={styles.flags}>
            {normalized.visible.map((cc) => (
              <CircleFlag key={cc} countryCode={cc} height={16} />
            ))}
            {normalized.hiddenCount > 0 && <span>+{normalized.hiddenCount}</span>}
          </div>
        )}
      </div>

      {/* Праворуч: локальний час НР */}
      <div className={styles.localTime}>
        <span>{nyDisplay} {t('tooltip.by_your_time')}</span>
      </div>
    </button>
  );
}
