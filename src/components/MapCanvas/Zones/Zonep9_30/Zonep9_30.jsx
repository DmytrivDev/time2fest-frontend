import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Australia from './Australia';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+9:30';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'zoneEnd')}>
      <path
        d="M1514 714V664.5L1510.5 662.5V659L1508 658L1504 658.5L1502 656.5L1501.5 655L1503.5 653.5L1507 654L1510.5 653.5L1510 650V648L1508.5 646.5L1510.5 643.5L1509 638V635.5L1507.5 635L1506.5 635.5L1504 638.5L1500.5 641L1499.5 640H1497.5L1494 639.5L1490 637.5L1487.5 635.5L1482 636.5H1480.5L1478 637L1475.5 636.5L1474 637.5L1473 639.5V641L1474.5 641.5H1477L1473 646V648L1471.5 648.5L1471 651L1469.5 653.196V714H1514Z"
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
