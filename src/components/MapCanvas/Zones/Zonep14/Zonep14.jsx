import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Kiribati from './Kiribati';

export default function Zonep2({ onZoneClick }) {
  const ZONE_ID = 'UTC+14';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'redCtrs')}>
      <g
        className={'zoneM'}
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="KI"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M47 590.5H4L14.8843 612.5H58.5L66.5 640.5H91V631.5L61.5 557H36V564.5L47 590.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
      <Kiribati ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
