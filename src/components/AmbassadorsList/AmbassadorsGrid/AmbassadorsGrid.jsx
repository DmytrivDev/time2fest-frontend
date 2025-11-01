import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { IoWarningOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import AmbassadorItem from '../../common/AmbassadorItem';

import styles from './AmbassadorsGrid.module.scss';

const AmbassadorsGrid = React.memo(({ isLoading, error, data }) => {
  const { t } = useTranslation('common');
  const { pathname } = useLocation();
  const isProfilePage = pathname.includes('/profile/');

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

  const Warning = ({ text, warnType }) => (
    <div
      role="alert"
      aria-live="polite"
      className={clsx('warning', {
        ['error']: warnType === 'error',
        ['noData']: warnType === 'nodata',
      })}
    >
      <IoWarningOutline size={18} />
      <span>{text}</span>
    </div>
  );

  if (!ambassadors.length || error) {
    return (
      <div className={clsx(styles.grid, styles.loadingGridF)}>
        <Warning warnType="nodata" text={t('controls.no_data')} />
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {ambassadors.map(amb => (
        <AmbassadorItem key={amb.id} data={amb} isProfile={isProfilePage} />
      ))}
    </ul>
  );
});

export default AmbassadorsGrid;
