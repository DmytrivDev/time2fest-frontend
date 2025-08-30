import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC-2';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'redCtrs')}>
      <g
        className="zoneM"
        data-tt="1"
        data-id={ZONE_ID}
        data-flags=""
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M645.5 20.5V0L719.5 -0.5V29.5H714L703.5 23L682.825 19.5H652.5L647 20.5H645.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
        <path
          d="M719.5 188.265V162L717.5 162.5L717 163V164L714.5 164.5L712 167L709.5 167.5L709 168.5L706.5 169L706 170.5L704.5 170V170.5L703 172.5L694.5 175L692 174.5L688.5 176.5L686.5 176L685.5 177.5L684 176.5L683.5 176L681.5 176.5L682 178L681 178.5L680 177.5L677.5 178.5L674.5 178L668.5 181L665.5 186.5L663.5 188L661.5 191L658 193.5L655 194L653.5 196L652.5 196.5L651 197V196V195.5H650L648 197H645.5V604.5L647 606L650 607H653.5L656 608L659 617.5L658.5 619.5V621L658 624L657 626.5L655 629L653.5 629.5V630V631L651 634L650.5 634.5H649.5L648.5 635.5H647.5V636L647 636.5V637.5L646.5 638L645.5 639L646 639.5L645.5 640V641V912H719.5V512.5H697.5V487H719.5V396.5H672.5V367H719.668V220.5H707.5V188.265H719.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
    </g>
  );
}
