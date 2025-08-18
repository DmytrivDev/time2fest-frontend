import { useRef, useLayoutEffect, useEffect, useState, useMemo } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { IoTime } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';
import styles from './ZoneCountryItem.module.scss';

export default function ZoneCountryItem({
  id,
  name,
  code,
  desc,
  zoneLabel,
  offsetFromApi,
  isOpen,
  onToggle,
}) {
  const { t } = useTranslation('common');

  const utcOffsetStr = useMemo(() => {
    if (zoneLabel && zoneLabel.toUpperCase().startsWith('UTC')) return zoneLabel;
    if (offsetFromApi)
      return offsetFromApi.trim().startsWith('UTC')
        ? offsetFromApi.trim()
        : `UTC${offsetFromApi.trim()}`;
    return 'UTC+0';
  }, [zoneLabel, offsetFromApi]);

  const ny = useMemo(() => getNextNYLocalForUtcOffset(utcOffsetStr), [utcOffsetStr]);

  // ---- АКОРДЕОН ----
  const ref = useRef(null);
  const mountedRef = useRef(false); // <-- нове: чи це не перший рендер
  const [maxH, setMaxH] = useState('0px');
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false); // щоб відключити transition на маунті

  useEffect(() => {
    // увімкнути анімації після першого макрокадру
    const id = requestAnimationFrame(() => {
      mountedRef.current = true;
      setAnimate(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const h = `${el.scrollHeight}px`;
    const first = !mountedRef.current;

    if (isOpen) {
      setVisible(true);
      if (first) {
        // перший рендер у відкритому стані — показати одразу без анімації
        setMaxH(h);
      } else {
        // 0 -> h
        setMaxH('0px');
        requestAnimationFrame(() => setMaxH(h));
      }
    } else {
      if (first) {
        // перший рендер у закритому стані — одразу 0 без переходу
        setVisible(false);
        setMaxH('0px');
      } else {
        // h -> 0
        setMaxH(h);
        requestAnimationFrame(() => setMaxH('0px'));
      }
    }
  }, [isOpen]);

  // якщо контент змінюється, оновити висоту тільки коли відкрито
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (isOpen) setMaxH(`${el.scrollHeight}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  const onTransitionEnd = (e) => {
    if (e.propertyName !== 'max-height') return;
    if (!isOpen) setVisible(false);
  };

  return (
    <article className={clsx(styles.countryItem, isOpen && styles.opened)}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={styles.itemCtrl}
        aria-controls={`country-panel-${id}`}
        id={`country-header-${id}`}
      >
        <div className={styles.itemTopLeft}>
          {code && <CircleFlag countryCode={code} height="20" />}
          <strong>{name}</strong>
          <span className={styles.timeZone}>{utcOffsetStr.replace('UTC', 'UTC ')}</span>
          <ul className={styles.propsList}>
            <li style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <IoTime />
              <span>{t('controls.countdown')}</span>
            </li>
          </ul>
        </div>

        <div className={styles.itemTopRight}>
          <span>
            {ny.display} {t('tooltip.by_your_time')}
          </span>
        </div>
      </button>

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
          // вимикаємо transition на першому рендері, щоб не було "спалаху"
          transition: animate ? 'max-height 0.4s ease, opacity 0.25s ease' : 'none',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {desc && (
          <div className={styles.itemDesc}>
            <p>{desc}</p>
          </div>
        )}

        <div className={styles.itemActions}>
          <button className="btn_primary" type="button">
            {t('controls.details')}
          </button>
          <button className="btn_transp" type="button">
            {t('controls.add_to_shel')}
          </button>
        </div>
      </div>
    </article>
  );
}
