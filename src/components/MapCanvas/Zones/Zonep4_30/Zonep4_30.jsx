import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Afganistan from './Afganistan';

import { useIsZoneEndedById } from '@/hooks/useIsZoneEndedById';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+4:30';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const zoneEnded = useIsZoneEndedById(ZONE_ID);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };
  
  return (
    <g className={clsx('zone', zoneEnded && 'zoneEnd')}>
      <path
        d="M1199.5 389L1201.5 388.5L1199 387.5L1196 388.5L1195.5 388L1194 387.5L1190.5 390L1186 391.5L1185 390L1184.5 389.5L1185.5 384.5H1184V383.5L1182.5 381.5L1181 382L1178.5 384.5V385L1179 386L1178.5 387L1176 386.5L1175 387L1174 389L1172.5 388L1169 389.5L1168 390.5L1166.5 389H1164L1163 388H1159L1157 387H1156.5L1155.5 388.5L1152 389L1151 393.5L1149.5 394.5L1143.5 396.5L1144 397.5L1143 399L1140 400L1139.5 400.5L1138 398.5L1134.5 398L1133.5 402L1132 404L1132.5 405H1131.5L1131 405.5L1130.5 406.5L1131 409L1132.5 409.5L1131 411.5L1132.5 416.5L1132 417.5L1132.5 420.5L1136 421.5L1137 423V424L1132.5 429.5L1141 432L1146 431.5L1148.5 432L1150.5 431L1155.5 430.5L1159 429.5L1160 423.5L1162.5 421.5L1165 422L1166.5 421.5L1165.5 420.5L1168 419.5L1170.5 419L1172 420L1174 418.5V415.5L1174.5 415L1175 412.5L1177 412L1179 410.5L1177 407.5V406.5L1179.5 407H1180.5L1182.5 406.5L1183 406L1183.5 405L1182.5 404L1185 401.5L1186 400L1185.5 398L1183.5 395.5L1186 393L1186.5 393.5L1190.5 391L1196 390.5L1197.5 391L1200 390L1199.5 389Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        className={'zoneM'}
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="AF"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      />
      <Afganistan ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
