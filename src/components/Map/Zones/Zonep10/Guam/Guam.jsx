import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = e => {
    e.stopPropagation();
    const zoneId = e.currentTarget.getAttribute('data-id');
    const code = (
      e.currentTarget.getAttribute('data-country') || ''
    ).toUpperCase();
    onClick?.(zoneId, code, e);
  };

  return (
    <g
      id="Guam"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GU"
      data-label={`${t('countries.guam')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1549.77 515.947C1549.77 517.27 1548.7 518.348 1547.37 518.348C1546.05 518.348 1544.98 517.27 1544.98 515.947C1544.98 514.624 1546.05 513.546 1547.37 513.546C1548.7 513.546 1549.77 514.624 1549.77 515.947Z"
          fill="#14D2DC"
        />
        <path
          d="M1547.91 515.494L1548.62 515.301L1547.36 516.994L1547.02 516.004L1547.91 515.494Z"
          fill="#14D2DC"
        />
      </g>
      <path
        d="M1562 512.5H1538.5V522.5H1562V512.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
