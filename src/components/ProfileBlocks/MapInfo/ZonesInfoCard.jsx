import React, { useMemo } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useQueries } from '@tanstack/react-query';
import clsx from 'clsx';

import { api } from '@/utils/api';
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

  // ---- Визначаємо сторінку ----
  const lastSlug = window.location.pathname.split('/').pop();
  const isTimeZonesPage = lastSlug === 'timezones';

  // ================= PREPARE DATA =================
  const normalizedCountries = useMemo(
    () => countries.map(c => c.attributes || c),
    [countries]
  );

  const countriesWithZone = useMemo(() => {
    return normalizedCountries.map(country => {
      const rawZone =
        zone && zone.trim() !== ''
          ? zone
          : Array.isArray(country.time_zones) && country.time_zones.length > 0
            ? country.time_zones[0].code
            : 'UTC+0';

      const currentTz = rawZone.startsWith('UTC')
        ? rawZone
        : `UTC${rawZone.replace('UTC', '')}`;

      return {
        country,
        currentTz,
      };
    });
  }, [normalizedCountries, zone]);

  // ================= TRANSLATIONS CHECK (CAMERAS) =================
  const cameraQueries = useQueries({
    queries: countriesWithZone.map(({ country, currentTz }) => ({
      queryKey: ['translations', country.slug, currentTz],
      queryFn: async () => {
        const res = await api.get(
          `/translations?country=${country.slug}&zone=${currentTz}`
        );
        const items = res?.data?.items;
        return Array.isArray(items) && items.length > 0;
      },
      enabled: Boolean(country.slug && currentTz),
    })),
  });

  // ================= LOADING =================
  if (loading) {
    return (
      <aside className={clsx(styles.aside, styles.zonesInf)}>
        <button className={styles.close} onClick={onClose}></button>

        <div className={styles.wrap}>
          <div className={clsx(styles.timerLoading, 'loading')}></div>

          <div className={styles.list}>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(styles.zoneCard, styles.zoneCardLoading)}
                >
                  <div className={styles.header}>
                    <div className={clsx(styles.flagLoading, 'loading')} />
                    <h3 className={clsx(styles.titleLoading, 'loading')} />
                  </div>

                  <div className={clsx(styles.types, styles.typesLoading)}>
                    <span className="loading" />
                    <span className="loading" />
                  </div>

                  <div
                    className={clsx(
                      styles.detailsBtn,
                      styles.detailsBtnLoading,
                      'loading'
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // ================= RENDER =================
  return (
    <aside className={clsx(styles.aside, styles.zonesInf)}>
      <button className={styles.close} onClick={onClose}></button>

      <div className={styles.wrap}>
        <TimerWidget zone={zone} />

        <div className={styles.list}>
          <div>
            {countriesWithZone.length > 0 ? (
              countriesWithZone.map(({ country, currentTz }, i) => {
                const code = country.CountryCode?.toLowerCase();
                const name = country.CountryName;

                const TimezoneDetail = Array.isArray(country.TimezoneDetail)
                  ? country.TimezoneDetail
                  : [];

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
                const hasCamera = cameraQueries[i]?.data === true;

                const buttonValue = isTimeZonesPage
                  ? country.CountryCode
                  : country.slug;

                return (
                  <div key={i} className={styles.zoneCard}>
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

                    <button
                      type="button"
                      onClick={() => onCountrySelect?.(buttonValue)}
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
        </div>
      </div>
    </aside>
  );
};

export default ZonesInfoCard;
