import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import NewZeland from './NewZeland';
import Tonga from './Tonga';
import Samoa from './Samoa';
import Tokelau from './Tokelau';
import Kiribati from './Kiribati';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+13';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'brownCtrs', 'zoneEnd')}>
      <g
        fill="#D9D9D9"
        fillOpacity="0.01"
        className={'zoneM'}
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="NZ, TO, WS, TK, KI"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M1721.5 859.5H1647.5V757L1684.5 713H1719L1734.5 681V656H1748.5V643.5L1730 619.5V612.5V590.5H1781.5V612.5H1776.5V633H1765.5V658H1759L1758.5 821.5L1721.5 859.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
        <path
          d="M14.5 612.5H0V590.5H3.5L14.5 612.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
      <NewZeland ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Tonga ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Samoa ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Tokelau ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Kiribati ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
