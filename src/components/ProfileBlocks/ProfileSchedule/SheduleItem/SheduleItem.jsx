import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { IoCamera, IoVideocam, IoClose, IoTime } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import { useGraphStore } from '@/stores/useGraphStore';
import styles from './SheduleItem.module.scss';

const SheduleItem = ({ code, country, isLoading = false, onZoneClick }) => {
  const { t } = useTranslation();
  const { removeCountry } = useGraphStore();

  const nyDisplay = useMemo(() => {
    try {
      const ny = getNextNYLocalForUtcOffset(code);
      return ny?.display ?? '';
    } catch {
      return '';
    }
  }, [code]);

  const hasCountry = !!country;
  const hasAmbassador = !!country?.hasAmbassador;
  const hasCamera = !!country?.hasCamera;

  // --- події ---
  const handleZoneClick = e => {
    if (!country) {
      // якщо країни нема — відкривається кліком на всю область
      onZoneClick?.(code, null);
      return;
    }

    // якщо країна є — відкривається лише по певних елементах
    const clickable =
      e.target.closest(`.${styles.countryName}`) ||
      e.target.closest(`.${styles.flag}`) ||
      e.target.closest(`.${styles.badge}`) ||
      e.target.closest(`.${styles.watch}`);

    if (clickable) {
      onZoneClick?.(code, country?.slug || null);
    }
  };

  const handleRemove = e => {
    e.stopPropagation();

    if (!country?.slug || !country?.zone) return;
    removeCountry(country.slug, country.zone.replace(/^UTC\s*/i, '').trim());
  };

  return (
    <li className={clsx(styles.item, hasCountry && styles.choosedCountry)}>
      <div
        className={clsx(styles.button, {
          [styles.active]: hasCountry,
        })}
        onClick={handleZoneClick}
        role="button"
        tabIndex={0}
      >
        <span className={styles.left}>
          <div className={styles.time}>
            <span className={styles.time}>{nyDisplay || '—:—'}</span>
            <span className={styles.zone}>{code}</span>
          </div>

          {hasCountry && (
            <div className={styles.country}>
              <CircleFlag
                countryCode={country.code.toLowerCase()}
                height="16"
                className={styles.flag}
              />
              <span className={styles.countryName}>{t('countries.'+country.slug)}</span>
            </div>
          )}
        </span>

        <span className={clsx(styles.right, hasCountry && styles.noAfter)}>
          {hasCountry ? (
            <>
              <div className={styles.icons}>
                <span className={styles.type}>
                  <IoTime />
                </span>
                {hasCamera && (
                  <span className={clsx(styles.badge, styles.camera)}>
                    <IoVideocam />
                  </span>
                )}
                {hasAmbassador && (
                  <span className={clsx(styles.badge, styles.amb)}>
                    <IoCamera />
                  </span>
                )}
              </div>

              <button
                type="button"
                className={clsx(styles.actionBtn, styles.watch, 'btn_primary')}
                onClick={e => {
                  e.stopPropagation();
                  onZoneClick?.(code, country?.code || null);
                }}
              >
                {t('profile.watch')}
              </button>

              <button
                type="button"
                className={styles.removeCtr}
                onClick={handleRemove}
              >
                <IoClose className={styles.close} />
              </button>
            </>
          ) : (
            <span className={styles.empty}>{t('profile.choose')}</span>
          )}
        </span>
      </div>
    </li>
  );
};

export default SheduleItem;
