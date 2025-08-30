import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Nepal from './Nepal';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+5:45';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone')}>
      <path
        d="M1232.5 428.5V428H1232L1229 430V431L1228.5 432V432.5L1227.5 434V435L1229.5 436.5L1230 436L1232.5 437.5L1234 439L1236.5 440.5L1237 440L1237.5 440.5L1240 441L1241 442.5L1243.5 443L1244.5 442.5L1246 443L1246.5 442.5H1248L1250 443V444.5L1252.5 445.5L1253.5 446.5L1255 446L1256 447H1257.5L1259 447.5L1260.5 448L1262 447L1262.5 448H1263L1266.5 448.5L1267 448L1267.5 446.5L1267 444.5L1267.5 440.5H1265L1262 440L1260.5 439L1259.5 440L1258 439.5L1257.5 439L1257 440L1255.5 438H1252.5L1253 436.5H1251L1248.5 435L1248 434.5L1247.5 433L1245.5 433.5L1243 431L1241 430.5L1238.5 428.5L1237.5 427L1234.5 426.5L1233.5 428.5H1232.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        className={'zoneM'}
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="NP"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      />
      <Nepal ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
