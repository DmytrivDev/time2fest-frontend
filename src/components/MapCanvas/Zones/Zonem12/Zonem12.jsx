import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import AmericanIslands from './AmericanIslands';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC-12';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'yellowCtrs')}>
      <g
        className="zoneM"
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="US"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M1758.5 159.5V0.5V0H1721.5V116L1758.5 159.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
        <path
          d="M1759.5 402V325H1721.5V402H1759.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
        <path
          d="M1760 456.5H1721.5V590.5H1760V456.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
        <path
          d="M1758.5 821.5V911.5V912H1721.5V859.5L1758.5 821.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
      <AmericanIslands ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
