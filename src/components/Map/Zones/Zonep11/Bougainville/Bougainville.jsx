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
    onClick?.(zoneId, code);
  };

  return (
    <g
      id="Bougainville"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PG"
      data-label={`${t('countries.bougainville')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1596.57 608.947L1596.05 607.275L1596.65 606.76L1597.03 607.708L1596.57 608.947Z"
          fill="#FA7850"
        />
        <path
          d="M1602.17 617.241L1602.02 616.439L1602.67 616.902L1602.17 617.241Z"
          fill="#FA7850"
        />
        <path
          d="M1601.77 615.974L1599.65 614.901L1596.99 611.214L1596.91 608.714L1598.6 609.365L1599.22 610.885L1602.87 614.156L1602.99 615.375L1601.77 615.974Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M1605 632.5L1595 619.5V590H1605V632.5Z"
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
