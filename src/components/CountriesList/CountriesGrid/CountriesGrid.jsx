import React from 'react';
import clsx from 'clsx';
import CountryItem from '../../common/CountryItem';

import styles from './CountriesGrid.module.scss';

const AmbassadorsGrid = React.memo(({ isLoading, error, data }) => {
  if (error || !data) return null;

  // Якщо завантажується — показати 6 “скелетонів”
  if (isLoading) {
    return (
      <div className={clsx(styles.grid, styles.loadingGrid)}>
        {Array.from({ length: 9 }).map((_, i) => (
          <CountryItem key={i} isLoading />
        ))}
      </div>
    );
  }

  const ambassadors = Array.isArray(data) ? data : [];

  return (
    <div className={styles.grid}>
      {ambassadors.map(amb => (
        <CountryItem key={amb.id} data={amb} />
      ))}
    </div>
  );
});

export default AmbassadorsGrid;
