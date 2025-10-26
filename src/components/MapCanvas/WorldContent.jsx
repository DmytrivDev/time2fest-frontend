import Zones from './Zones';
import Borders from './Borders';
import TimeLines from './TimeLines';
import DayLine from './DayLine';

export default function WorldContent({ onZoneClick }) {
  return (
    <svg
      width="1781"
      height="911"
      viewBox="0 0 1781 911"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1781" height="911" fill="#D2D1D1" />
      <g id="Group 43">
        <g id="Time_zones_of_the_world-UTC (1) 4" clipPath="url(#clip0_0_1)">
          <g id="Group">
            <path
              id="Vector"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.99567 0H1777C1779.22 0 1779 0 1781 0.000556886V911C1779 911 1779.22 911 1777 911H3.99567C1.78207 911 2.5 911 0 911V0.000556886C2 0 1.78207 0 3.99567 0Z"
              fill="#474747"
            />
          </g>

          {/* --- Основні шари карти --- */}
          <Zones onZoneClick={onZoneClick} />
          <Borders />
          <TimeLines />
          <DayLine />
        </g>
      </g>
    </svg>
  );
}
