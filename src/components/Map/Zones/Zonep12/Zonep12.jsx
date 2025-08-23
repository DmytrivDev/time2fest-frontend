import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Fiji from './Fiji';
import WallisAndFutuna from './WallisAndFutuna';
import Tuvalu from './Tuvalu';
import Nauru from './Nauru';
import Kiribati from './Kiribati';
import MarshalIslands from './MarshalIslands';
import Russia from './Russia';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+12';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'yellowCtrs')} id="+12">
      <g
        id="Zone_12"
        fill="#D9D9D9"
        fillOpacity="0.01"
        className={'zoneM'}
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="FJ, WF, TV, NR, KI, MH, RU"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M1684.5 161.852V-0.000530019L1721.5 -0.00195312V116L1758.5 159L1776.5 180.5V198.5L1672 292.5L1651 311.5H1610.5L1598.5 299.254V261L1635.5 234V230L1635 228L1635.5 227L1634 226L1636.5 225V222L1636 221L1634.5 220.5V219.5L1636.5 218V217L1637.5 216L1636.5 213.5L1637.5 212.5L1637 211L1637.5 210.5H1638.5L1639 209.5L1640 208.5L1639 207.5L1638.5 206L1637.5 206.5L1632 205.5L1631.5 204L1629.5 203L1625.5 202.5L1623 200L1618 198V193.5L1615 192L1617.5 189.5L1617 187.5L1612.5 185L1611.5 183L1613 181.5L1614.5 181L1613.5 180L1615.5 178L1620.5 177L1622 177.5L1622.5 177L1628 176.5L1629.5 175.5L1635 176.5L1636.5 174L1636 172.5L1637 171.5L1635.5 170.5V169.5L1636.5 169L1635 167L1634.5 165.5L1635 165L1643 164L1649.5 165.5H1658.5L1661.5 164L1662.5 162.5L1664 161.5L1669 162.5L1671.5 160L1675.5 161L1684.5 161.852Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
        <path
          d="M1730 590.5H1721.5V325.126L1684.5 300.5V482.321L1622.5 482.5V537.5H1644V590H1684.5V713.5H1718.5L1734.5 681V656H1748.5V643.5L1730 619.5V590.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
        <path
          d="M1721.5 859.5V912H1684.5V859.5H1721.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
      <Fiji ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <WallisAndFutuna ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Tuvalu ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Nauru ny={ny} utc={ZONE_ID} onClick={onZoneClick} /> 
      <Kiribati ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <MarshalIslands ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Russia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
