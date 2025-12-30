import { useRef, useLayoutEffect, useEffect, useState, useMemo } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { IoTime, IoCamera, IoVideocam } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useLoginPopupStore } from '@/stores/useLoginPopupStore';
import { useSubPopupStore } from '@/stores/useSubPopupStore';
import { useCountryTranslationsAvailable } from '@/hooks/useCountryTranslationsAvailable';
import { useCountryLiveAvailable } from '@/hooks/useCountryLiveAvailable';

import clsx from 'clsx';

import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import { useScheduleToggle } from '@/hooks/useScheduleToggle';

import styles from './ZoneCountryItem.module.scss';

export default function ZoneCountryItem({
  id,
  name,
  code,
  desc,
  details,
  slug,
  zoneLabel,
  offsetFromApi,
  isOpen,
  onToggle,
}) {
  //
  // ===================== 1. HOOKS =====================
  //
  const { t, i18n } = useTranslation('common');
  const { isAuthenticated, isPremium } = useAuth();
  const openLoginPopup = useLoginPopupStore(s => s.openPopup);
  const openSubPopup = useSubPopupStore(s => s.openPopup);


  //
  // ===================== 2. NORMALIZE UTC =====================
  //
  const utcOffsetStr = useMemo(() => {
    if (zoneLabel?.toUpperCase?.().startsWith('UTC')) return zoneLabel;
    if (offsetFromApi) {
      const clean = offsetFromApi.trim();
      return clean.startsWith('UTC') ? clean : `UTC${clean}`;
    }
    return 'UTC+0';
  }, [zoneLabel, offsetFromApi]);

  const ny = useMemo(
    () => getNextNYLocalForUtcOffset(utcOffsetStr),
    [utcOffsetStr]
  );

  //
  // ===================== 4. ADD / REMOVE FROM SCHEDULE =====================
  //
  const { isAdded, handleToggle } = useScheduleToggle({
    slug,
    code,
    zone: utcOffsetStr,
  });

  //
  // ===================== 5. ACCORDION ANIMATION =====================
  //
  const ref = useRef(null);
  const mountedRef = useRef(false);

  const [maxH, setMaxH] = useState('0px');
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  // enable animation after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      mountedRef.current = true;
      setAnimate(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // open / close behavior
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fullH = `${el.scrollHeight}px`;
    const first = !mountedRef.current;

    if (isOpen) {
      setVisible(true);
      if (first) {
        setMaxH(fullH);
      } else {
        setMaxH('0px');
        requestAnimationFrame(() => setMaxH(fullH));
      }
    } else {
      if (first) {
        setVisible(false);
        setMaxH('0px');
      } else {
        setMaxH(fullH);
        requestAnimationFrame(() => setMaxH('0px'));
      }
    }
  }, [isOpen]);

  // adjust height on content resize
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (isOpen) setMaxH(`${el.scrollHeight}px`);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  const onTransitionEnd = e => {
    if (e.propertyName === 'max-height' && !isOpen) {
      setVisible(false);
    }
  };

  const { hasTranslations: hasCamera } = useCountryTranslationsAvailable({
    slug,
    timezone: utcOffsetStr,
  });

  const { hasLive: hasAmbassador } = useCountryLiveAvailable({
    slug,
    timezone: utcOffsetStr,
  });

  //
  // ===================== 6. RETURN =====================
  //
  return (
    <article className={clsx(styles.countryItem, isOpen && styles.opened)}>
      {/* TOP BUTTON */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={styles.itemCtrl}
        aria-controls={`country-panel-${id}`}
        id={`country-header-${id}`}
      >
        <div className={styles.itemTopLeft}>
          <div className={styles.naming}>
            {code && (
              <CircleFlag countryCode={code.toLowerCase()} height="20" />
            )}
            <h3>{name}</h3>
          </div>

          <span className={styles.timeZone}>
            {utcOffsetStr.replace('UTC', 'UTC ')}
          </span>

          <ul className={styles.propsList}>
            <li
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <IoTime />
              <span>{t('controls.countdown')}</span>
            </li>

            {hasAmbassador && (
              <li
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <IoCamera /> <span>{t('controls.ambass')}</span>
              </li>
            )}

            {hasCamera && (
              <li
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <IoVideocam /> <span>{t('controls.veb')}</span>
              </li>
            )}
          </ul>

          <span className={styles.display}>{ny?.display ?? ''}</span>
        </div>

        <span className={styles.toggleBtn}>
          <span>{t(isOpen ? 'controls.hide' : 'controls.show')}</span>
        </span>
      </button>

      {/* COLLAPSIBLE AREA */}
      <div
        ref={ref}
        className={styles.itemFull}
        id={`country-panel-${id}`}
        role="region"
        aria-labelledby={`country-header-${id}`}
        style={{
          overflow: 'hidden',
          maxHeight: maxH,
          opacity: isOpen ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: animate
            ? 'max-height 0.4s ease, opacity 0.25s ease'
            : 'none',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {desc && (
          <div className={styles.itemDesc}>
            <p>{desc}</p>
          </div>
        )}

        <div className={styles.itemActions}>
          <Link
            to={`/${
              i18n.language !== 'en' ? i18n.language + '/' : ''
            }country/${slug}?tz=${encodeURIComponent(String(zoneLabel))}`}
            className="btn_transp"
          >
            {t('controls.details')}
          </Link>

          {/* === NEW SCHEDULE BUTTON === */}
          <button
            className={clsx(
              styles.addBtn,
              'btn_primary plus',
              isAdded && 'added'
            )}
            onClick={() => {
              if (!isAuthenticated) {
                openLoginPopup();
                return;
              }
              if (!isPremium) {
                openSubPopup();
                return;
              }
              handleToggle();
            }}
          >
            {isAdded ? t('profile.added') : t('nav.addshelb')}
          </button>
        </div>
      </div>
    </article>
  );
}
