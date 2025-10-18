import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { IoWarningOutline } from 'react-icons/io5';
import CountryItem from '../../common/CountryItem';

import styles from './CountriesGrid.module.scss';

const CountriesGrid = React.memo(({ isLoading, error, data }) => {
  const { t } = useTranslation('common');

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

  const countries = Array.isArray(data) ? data : [];

  const Warning = ({ text, warnType }) => (
    <div
      role="alert"
      aria-live="polite"
      className={clsx('warning', {
        ["error"]: warnType === 'error',
        ["noData"]: warnType === 'nodata',
      })}
    >
      <IoWarningOutline size={18} />
      <span>{text}</span>
    </div>
  );

  if (!countries.length || error) {
    return (
      <div className={clsx(styles.grid, styles.loadingGridF)}>
        <Warning warnType="nodata" text={t('controls.no_data')} />
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {countries.map(amb => (
        <CountryItem key={amb.id} data={amb} />
      ))}
    </div>
  );
});

export default CountriesGrid;
