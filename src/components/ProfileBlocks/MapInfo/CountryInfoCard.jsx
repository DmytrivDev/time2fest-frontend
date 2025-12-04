import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import TimerWidget from './TimerWidget';
import { useScheduleToggle } from '@/hooks/useScheduleToggle';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';

import styles from './MapInfo.module.scss';

const MapInfo = ({ data, zone, loading, onClose }) => {
  //
  // ===================== 1. HOOKS (ЗАВЖДИ ОДНАКОВІ) =====================
  //
  const { t, i18n } = useTranslation('common');

  // Деструктуризація без умов — React любить сталий порядок хуків
  const CountryName = data?.CountryName ?? null;
  const CountryCode = data?.CountryCode ?? null;
  const ShortDesc = data?.ShortDesc ?? null;
  const CountryDesc = data?.CountryDesc ?? null;
  const Background = data?.Background ?? null;
  const TimezoneDetail = data?.TimezoneDetail ?? [];
  const time_zones = data?.time_zones ?? [];
  const slug = data?.slug ?? null;
  const ambassadors = data?.ambassadors ?? [];

  const code = CountryCode?.toUpperCase?.() ?? null;

  //
  // ===================== 2. MEMOS (СТАЛІ) =====================
  //

  // Формуємо UTC зону
  const utcOffsetStr = useMemo(() => {
    if (zone?.toUpperCase().startsWith('UTC')) return zone;
    return time_zones[0]?.code || 'UTC+0';
  }, [zone, time_zones]);

  const currentTz = utcOffsetStr.startsWith('UTC')
    ? utcOffsetStr
    : `UTC${utcOffsetStr}`;

  const offset = currentTz.replace('UTC', '').replace(':00', '').trim();

  const currentZone = useMemo(() => {
    return TimezoneDetail.find(z => {
      const zn = z.Zone?.replace(':00', '').trim();
      return (
        zn === offset ||
        zn === offset.replace('+', '') ||
        zn === offset.replace('UTC', '')
      );
    });
  }, [TimezoneDetail, offset]);

  //
  // ===================== 3. CUSTOM HOOK (СТАЛИЙ) =====================
  //
  const { isAdded, handleToggle } = useScheduleToggle({
    slug,
    code,
    zone: currentTz,
  });

  //
  // ===================== 4. HELPERS =====================
  //

  const backgroundUrl =
    Background?.formats?.medium
      ? `${import.meta.env.VITE_STRIPE_URL}${Background.formats.medium.url}`
      : Background?.url
        ? `${import.meta.env.VITE_STRIPE_URL}${Background.url}`
        : `${import.meta.env.VITE_STRIPE_URL}${Background}`;

  const hasAmbassador = ambassadors.length > 0;
  const hasCamera = currentZone?.VebCamera || false;

  const localizedPath = `/${
    i18n.language !== 'en' ? i18n.language + '/' : ''
  }profile/countries/${slug}?tz=${encodeURIComponent(currentTz)}`;

  //
  // ===================== 5. LOADING BLOCK =====================
  //
  const LoadingBlock = (
    <aside className={styles.aside}>
      <button className={clsx(styles.close, styles.desk)} onClick={onClose} />

      <div className={styles.wrap}>
        <button className={clsx(styles.close, styles.mob)} onClick={onClose} />

        <div className={clsx(styles.card, styles.cardLoading)}>
          <div className={clsx(styles.photo, 'loading')} />

          <div className={styles.header}>
            <div className={clsx(styles.flagLoading, 'loading')} />
            <h3 className={clsx(styles.titleLoading, 'loading')} />
          </div>

          <div className={clsx(styles.types, styles.typesLoading)}>
            <span className="loading" />
            <span className="loading" />
          </div>

          <p className={clsx(styles.desc, styles.descLoading)}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx} className="loading" />
            ))}
          </p>

          <div className={clsx(styles.details, styles.detailsLoading, 'loading')} />
          <div className={clsx(styles.add, styles.addLoading, 'loading', 'btn_primary')} />
        </div>

        <div className={clsx(styles.timerLoading, 'loading')} />
      </div>
    </aside>
  );

  //
  // ===================== 6. NORMAL BLOCK =====================
  //
  const NormalBlock = (
    <aside className={styles.aside}>
      <button className={clsx(styles.close, styles.desk)} onClick={onClose} />

      <div className={styles.wrap}>
        <button className={clsx(styles.close, styles.mob)} onClick={onClose} />

        <div className={styles.card}>
          {/* Фото */}
          <div className={styles.photo}>
            <img src={backgroundUrl} alt={CountryName} loading="lazy" />
            <span className={styles.utc}>{currentTz}</span>
          </div>

          {/* Заголовок */}
          <div className={styles.header}>
            {code && (
              <CircleFlag countryCode={code.toLowerCase()} height="20" />
            )}
            <h3>{CountryName}</h3>
          </div>

          {/* Теги */}
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

          {/* Опис */}
          <p className={styles.desc}>{ShortDesc || CountryDesc || ''}</p>

          {/* Деталі */}
          <Link to={localizedPath} className={styles.details}>
            {t('controls.details')}
          </Link>

          {/* Амбасадори */}
          {hasAmbassador && (
            <div className={styles.ambassadors}>
              <h4 className={styles.ambTitle}>{t('nav.ambassadors')}</h4>

              <div className={styles.ambList}>
                {ambassadors.map((amb, idx) => {
                  const photoUrl = amb.photo
                    ? `${import.meta.env.VITE_STRIPE_URL}${amb.photo}`
                    : '/country/amb_def.jpg';

                  return (
                    <Link to="#" key={amb.id || idx} className={styles.ambItem}>
                      <span className={styles.ambImg}>
                        <img src={photoUrl} alt={amb.name} />
                      </span>
                      <span className={styles.ambText}>{amb.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Кнопка */}
          <button
            type="button"
            onClick={handleToggle}
            className={clsx(styles.add, 'btn_primary', isAdded && styles.added)}
          >
            {isAdded ? t('profile.added') : t('nav.addshelb')}
          </button>
        </div>

        <TimerWidget zone={currentTz} />
      </div>
    </aside>
  );

  //
  // ===================== 7. RETURN (тільки умова, БЕЗ хуків!) =====================
  //
  return loading || !data ? LoadingBlock : NormalBlock;
};

export default MapInfo;
