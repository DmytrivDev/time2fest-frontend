import React from 'react';
import { CircleFlag } from 'react-circle-flags';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import TimerWidget from './TimerWidget';
import styles from './MapInfo.module.scss';

const ZonesInfoCard = ({
  zone,
  countries = [],
  loading,
  onClose,
  onCountrySelect,
}) => {
  const { t } = useTranslation('common');

  if (loading) {
    return (
      <aside className={styles.aside}>
        <button className={styles.close} onClick={onClose}></button>
        <div className={styles.wrap}>
          <div className={clsx(styles.timerLoading, 'loading')}></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={clsx(styles.zoneCard, styles.zoneCardLoading)}
            >
              <div className={clsx(styles.header)}>
                <div className={clsx(styles.flagLoading, 'loading')}></div>
                <h3 className={clsx(styles.titleLoading, 'loading')}></h3>
              </div>
              <div className={clsx(styles.types, styles.typesLoading)}>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
              <div
                className={clsx(
                  styles.detailsBtn,
                  styles.detailsBtnLoading,
                  'loading'
                )}
              ></div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.aside}>
      <button className={styles.close} onClick={onClose}></button>
      <div className={styles.wrap}>
        <TimerWidget zone={zone} />

        {countries && countries.length > 0 ? (
          countries.map((c, i) => {
            const country = c.attributes || c;
            const code = country.CountryCode?.toLowerCase();
            const name = country.CountryName;
            const TimezoneDetail = Array.isArray(country.TimezoneDetail)
              ? country.TimezoneDetail
              : [];

            const rawZone =
              zone && zone.trim() !== ''
                ? zone
                : Array.isArray(country.time_zones) &&
                    country.time_zones.length > 0
                  ? country.time_zones[0].code
                  : 'UTC+0';

            const currentTz = rawZone.startsWith('UTC')
              ? rawZone
              : `UTC${rawZone.replace('UTC', '')}`;

            const currentOffset = currentTz
              .replace('UTC', '')
              .replace(':00', '')
              .trim();

            const currentZone = TimezoneDetail.find(z => {
              if (!z.Zone) return false;
              const zoneNormalized = z.Zone.replace(':00', '').trim();
              return (
                zoneNormalized === currentOffset ||
                zoneNormalized === currentOffset.replace('+', '') ||
                zoneNormalized === currentOffset.replace('UTC', '')
              );
            });

            const hasAmbassador = !!currentZone?.Ambassador;
            const hasCamera = !!currentZone?.VebCamera;

            return (
              <div key={i} className={clsx(styles.zoneCard)}>
                <div className={styles.header}>
                  {code && <CircleFlag countryCode={code} height="20" />}
                  <h3>{name}</h3>
                </div>

                <div className={styles.types}>
                  <span className={styles.type}>
                    <IoTime /> {t('controls.countdown')}
                  </span>
                  {hasAmbassador && (
                    <span className={styles.type}>
                      <IoCamera /> {t('controls.ambass')}
                    </span>
                  )}
                  {hasCamera && (
                    <span className={styles.type}>
                      <IoVideocam /> {t('controls.veb')}
                    </span>
                  )}
                </div>

                {/* ---- Кнопка ---- */}
                <button
                  type="button"
                  onClick={() => onCountrySelect?.(country.slug)}
                  className={clsx(styles.detailsBtn, 'btn_primary')}
                >
                  {t('controls.details')}
                </button>
              </div>
            );
          })
        ) : (
          <p className={styles.desc}>{t('no_data')}</p>
        )}
      </div>
    </aside>
  );
};

export default ZonesInfoCard;
