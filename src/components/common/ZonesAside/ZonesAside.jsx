import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircleFlag } from 'react-circle-flags';
import clsx from 'clsx';
import styles from './ZonesAside.module.scss';

const ZonesAside = ({
  isLoading,
  error,
  data,
  activeZone,
  onSelectZone,
  isMobile = false,
  setShowAside = () => {},
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <aside className={styles.aside}>
        <div className={styles.inner}>
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className={clsx(styles.item, styles.loadingItem, 'loading')}
            />
          ))}
        </div>
      </aside>
    );
  }

  if (error || !data) return null;

  const handleClick = code => {
    if (typeof onSelectZone === 'function') onSelectZone(code);
    if (isMobile) setShowAside(false);
  };

  // 🔧 Універсалізація даних + правильний підрахунок
  const normalizedData = data.map(item => {
    let flags = [];
    let totalCountries = 0;

    if (item.flags && item.count !== undefined) {
      flags = item.flags;
      totalCountries = item.count;
    } else {
      flags = item.countryCodes || [];
      totalCountries = flags.length;
    }

    const extraCount = totalCountries > 3 ? totalCountries - 3 : 0;

    return {
      code: item.code,
      flags,
      extraCount,
    };
  });

  return (
    <aside className={styles.aside}>
      {isMobile && (
        <div className={styles.filter__header}>
          <h3>{t('modal.choose_zone')}</h3>
          <button
            className={styles.close}
            onClick={() => setShowAside(false)}
          ></button>
        </div>
      )}

      <div className={styles.inner}>
        {normalizedData.map(({ code, flags, extraCount }) => (
          <button
            key={code}
            onClick={() => handleClick(code)}
            className={clsx(styles.item, {
              [styles.active]: activeZone === code,
            })}
          >
            <div className={styles.left}>
              {isMobile && <div className={styles.filter__check}></div>}
              <span className={styles.code}>{code}</span>
            </div>

            <div className={styles.right}>
              <div className={styles.flags}>
                {flags && flags.length > 0 ? (
                  <>
                    {flags.slice(0, 3).map((f, i) => (
                      <CircleFlag
                        key={i}
                        countryCode={f.toLowerCase()}
                        height="18"
                      />
                    ))}
                    {extraCount > 0 && (
                      <span className={styles.count}>+{extraCount}</span>
                    )}
                  </>
                ) : (
                  <span className={styles.noFlags}>🌍</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ZonesAside;
