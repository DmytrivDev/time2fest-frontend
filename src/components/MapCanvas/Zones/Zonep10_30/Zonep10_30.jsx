import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Australia from './Australia';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+10:30';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'zoneEnd')}>
      <path
        d="M1469.5 744V714L1529 713.826V743.5L1535 744.5V749.5H1529V780L1526 779L1525 777L1523.5 776L1523 774L1523.5 772L1522.5 770L1518.5 765.5L1516 766L1515 767L1512.5 767.5L1511.5 768.5L1510 768L1506.5 768.5L1500 761.5L1498 760.5L1495 756L1494.5 753L1493.5 752L1491.5 747L1488 745.5L1485.5 746L1480 743L1478.5 743.5L1469.5 744Z"
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
