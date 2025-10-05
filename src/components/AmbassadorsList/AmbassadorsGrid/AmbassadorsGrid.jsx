import React from 'react';
import clsx from 'clsx';
import AmbassadorItem from '../../common/AmbassadorItem';

import styles from './AmbassadorsGrid.module.scss';

const AmbassadorsGrid = React.memo(({ isLoading, error, data }) => {
  if (error || !data) return null;

  // Якщо завантажується — показати 6 “скелетонів”
  if (isLoading) {
    return (
      <div className={clsx(styles.grid, styles.loadingGrid)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <AmbassadorItem key={i} isLoading />
        ))}
      </div>
    );
  }

  const ambassadors = Array.isArray(data) ? data : [];

  return (
    <div className={styles.grid}>
      {ambassadors.map(amb => (
        <AmbassadorItem key={amb.id} data={amb} />
      ))}
    </div>
  );
});

export default AmbassadorsGrid;
