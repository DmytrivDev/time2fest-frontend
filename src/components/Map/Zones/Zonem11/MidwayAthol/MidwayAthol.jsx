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
      id="MidwayAthol"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="US"
      data-label={`${t('countries.MidwayAthol')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1737.77 438.521C1737.77 439.849 1736.69 440.922 1735.37 440.922C1734.04 440.922 1732.97 439.849 1732.97 438.521C1732.97 437.198 1734.04 436.125 1735.37 436.125C1736.69 436.125 1737.77 437.198 1737.77 438.521Z"
        fill="#5DBD39"
      />
      <path
        d="M1727 442V428.5H1738.5V442H1727Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
