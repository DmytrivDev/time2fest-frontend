import clsx from 'clsx';
import styles from './AmbassadorsGrid.module.scss';

const AmbassadorsAside = ({ isLoading, error, data }) => {
  if (isLoading) {
    return (
      <aside className={styles.aside}>
        <ul>
          {Array.from({ length: 12 }).map((_, i) => (
            <li key={i} className="loading" />
          ))}
        </ul>
      </aside>
    );
  }

  if (error || !data) {
    return (
      <aside className={styles.aside}>
        <p className={styles.errorText}>Error loading time zones</p>
      </aside>
    );
  }

  const timeZones = [...new Set(data.map(a => a.timeZone).filter(Boolean))];

  return (
    <aside className={styles.aside}>
      <ul>
        {timeZones.map(tz => (
          <li key={tz}>
            <span>{tz}</span>
            <div className={styles.flags}>
              {/* Тут пізніше будуть прапорці країн */}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AmbassadorsAside;
