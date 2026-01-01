import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import FrenchPolinesia from './FrenchPolinesia';

import { useIsZoneEndedById } from '@/hooks/useIsZoneEndedById';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC-9:30';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const zoneEnded = useIsZoneEndedById(ZONE_ID);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', zoneEnded && 'zoneEnd')}>
      <g
        className="zoneM"
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="US, PF"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M153.5 646.5H126V617V616.721H153.5V646.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
      <FrenchPolinesia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
