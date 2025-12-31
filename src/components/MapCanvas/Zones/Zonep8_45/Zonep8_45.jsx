import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Australia from './Australia';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+8:45';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'zoneEnd')}>
      <path
        d="M1462 748V742.5L1469.5 739.5V744.5L1462 748Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        className={'zoneM'}
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="AU"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      />
      <Australia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
