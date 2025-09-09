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
      id="Nauru"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="NR"
      data-label={`${t('countries.nauru')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1653.8 584.401C1653.8 585.724 1652.73 586.802 1651.4 586.802C1650.08 586.802 1649 585.724 1649 584.401C1649 583.078 1650.08 582 1651.4 582C1652.73 582 1653.8 583.078 1653.8 584.401Z"
        fill="#F0F032"
      />
      <path
        d="M1644 562.5V590H1664.5V562.5H1644Z"
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
