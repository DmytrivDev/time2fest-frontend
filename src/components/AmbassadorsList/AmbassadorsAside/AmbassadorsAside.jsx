import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircleFlag } from 'react-circle-flags';
import clsx from 'clsx';
import styles from './AmbassadorsAside.module.scss';

const AmbassadorsAside = ({
  isLoading,
  error,
  data,
  activeZone,
  isMobile = false,
  setShowAside = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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
    const params = new URLSearchParams(location.search);
    if (activeZone === code) {
      params.delete('tz');
    } else {
      params.set('tz', code);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

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
        {data.map(({ code, flags, count }) => (
          <button
            key={code}
            onClick={() => handleClick(code)}
            className={clsx(styles.item, {
              [styles.active]: activeZone === code,
            })}
          >
            <div className={styles.left}>
              {isMobile && (
                <div className={styles.filter__check}></div>
              )}
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
                    {flags.length > 3 && (
                      <span className={styles.more}>+{flags.length - 3}</span>
                    )}
                  </>
                ) : (
                  <span className={styles.noFlags}>🌍</span>
                )}
              </div>
              {count > 0 && <span className={styles.count}>+{count}</span>}
            </div>
          </button>
        ))}
      </div>
      {isMobile && (
        <div className={styles.filter__bottom}>
          <button
            className={clsx('btn_primary', styles.filterBtn)}
            onClick={() => setShowAside(false)}
          >
            {t('modal.set_changes')}
          </button>
        </div>
      )}
    </aside>
  );
};

export default AmbassadorsAside;
