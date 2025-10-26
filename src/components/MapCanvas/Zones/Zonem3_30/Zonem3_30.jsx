import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Canada from './Canada';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC-3:30';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone')}>
      <g
        className={'zoneM'}
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="CA"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M571.5 334.207V296.5H561L558.5 297L556.5 298L557 290.5L554.5 287.5L551.5 285.5L549 286L546.5 289.5V291.5L548.5 293.5V303.5L536.5 311.611V334L571.5 334.207Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
      <Canada ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
