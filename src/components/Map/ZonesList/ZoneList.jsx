import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { IoWarningOutline } from 'react-icons/io5';

import ZoneCountryItem from './ZoneCountryItem';
import ZoneZonesItem from './ZoneZonesItem';
import styles from './ZonesList.module.scss';

// ---- нормалізація country (для режиму countries) ----
function normalizeCountry(item) {
  const attrs = item.attributes || item;
  const id = item.id ?? attrs.id;
  const name = attrs.CountryName ?? attrs.name ?? '';
  const code = String(attrs.CountryCode ?? attrs.code ?? '').toLowerCase();
  const desc = attrs.CountryDesc ?? attrs.description ?? '';
  const off = attrs.offcet ?? attrs.offset ?? null; // "+02:00"
  return { id, name, code, desc, off };
}

// ---- нормалізація zone (для режиму zones) ----
function normalizeZone(item) {
  const attrs = item.attributes || item;
  const id = item.id ?? attrs.id;
  const code = attrs.code; // "UTC+2"

  // 1) Якщо бек уже віддає countryCodes — беремо їх як пріоритетні
  let codes = Array.isArray(attrs.countryCodes) ? attrs.countryCodes : null;

  // 2) Інакше збираємо з countries (data або без data)
  if (!codes) {
    const raw = Array.isArray(attrs?.countries?.data)
      ? attrs.countries.data
      : Array.isArray(attrs?.countries)
        ? attrs.countries
        : [];

    codes = raw.map((c) => {
      if (typeof c === 'string') return c;
      return c?.attributes?.CountryCode ?? c?.attributes?.code ?? c?.CountryCode ?? c?.code ?? '';
    });
  }

  // 3) Нормалізація: upper-case, лише 2 літери, без пустих, без дублікатів
  const countryCodes = Array.from(
    new Set(
      (codes || [])
        .map(String)
        .map((s) => s.trim().toUpperCase())
        .filter((s) => /^[A-Z]{2}$/.test(s)),
    ),
  );

  return { id, code, countryCodes };
}

export default function ZonesList({
  type = 'countries', // 'countries' | 'zones'
  zone, // код зони (для countries)
  loading,
  error,
  items,
  onZonePick, // для type='zones': клік по зоні
  onBack, // для type='countries' у режимі LIST: повернення до зон
}) {
  const { t } = useTranslation('common');

  // відкриття country-акордеонів лише в режимі countries
  const [openedId, setOpenedId] = useState(null);
  const toggle = (id) => setOpenedId((prev) => (prev === id ? null : id));

  const showBackBtn = type === 'countries' && typeof onBack === 'function';

  const list = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return type === 'zones' ? items.map(normalizeZone) : items.map(normalizeCountry);
  }, [items, type]);

  // ---- LOADING ----
  if (loading) {
    const count = type === 'zones' ? 12 : 6;
    return (
      <div className={clsx(styles.zonesList, styles.loadingList)}>
        {showBackBtn && (
          <div className={styles.backRow}>
            <button
              type="button"
              className={clsx(styles.backBtn, 'btn_secondary')}
              onClick={onBack}
              aria-label={t('controls.back_to_zones')}
            >
              {t('controls.back_to_zones')}
            </button>
          </div>
        )}
        <ul>
          {Array.from({ length: count }).map((_, i) => (
            <li
              key={i}
              className={clsx(
                'loading',
                styles.loadingItem,
                type === 'zones' && styles.loadingZones,
              )}
            />
          ))}
        </ul>
      </div>
    );
  }

  // ---- WARNINGS ----
  const Warning = ({ text, warnType }) => (
    <div
      role="alert"
      aria-live="polite"
      className={clsx(styles.zonesList, styles.warning, {
        [styles.error]: warnType === 'error',
        [styles.noData]: warnType === 'nodata',
      })}
    >
      <IoWarningOutline size={18} />
      <span>{text}</span>
    </div>
  );

  if (error) return <Warning warnType="error" text={t('controls.error')} />;
  if (!list.length) {
    return (
      <div className={styles.zonesList}>
        {showBackBtn && (
          <div className={styles.backRow}>
            <button
              type="button"
              className={clsx(styles.backBtn, 'btn_secondary')}
              onClick={onBack}
              aria-label={t('controls.back_to_zones')}
            >
              {t('controls.back_to_zones')}
            </button>
          </div>
        )}
        <Warning warnType="nodata" text={t('controls.no_data')} />
      </div>
    );
  }

  // ---- CONTENT ----
  return (
    <div className={styles.zonesList}>
      {showBackBtn && (
        <div className={styles.backRow}>
          <button
            type="button"
            className={clsx(styles.backBtn, 'btn_secondary')}
            onClick={onBack}
            aria-label={t('controls.back_to_zones')}
          >
            <span>{t('controls.back_to_zones')}</span>
          </button>
        </div>
      )}

      <ul>
        {type === 'zones' &&
          list.map((z) => (
            <li key={z.id}>
              <ZoneZonesItem
                id={z.id}
                code={z.code}
                countryCodes={z.countryCodes}
                onClick={(code) => onZonePick?.(code)}
              />
            </li>
          ))}

        {type === 'countries' &&
          list.map((c) => (
            <li key={c.id}>
              <ZoneCountryItem
                id={c.id}
                name={c.name}
                code={c.code}
                desc={c.desc}
                zoneLabel={zone}
                offsetFromApi={c.off}
                isOpen={openedId === c.id}
                onToggle={() => toggle(c.id)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
