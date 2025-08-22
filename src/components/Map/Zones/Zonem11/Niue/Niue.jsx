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
      id="Niue"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="NU"
      data-label={`${t('countries.Niue')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1774.71 677.228C1774.71 678.556 1773.62 679.629 1772.31 679.629C1770.97 679.629 1769.9 678.556 1769.9 677.228C1769.9 675.905 1770.97 674.832 1772.31 674.832C1773.62 674.832 1774.71 675.905 1774.71 677.228Z"
          fill="#5DBD39"
        />
        <path
          d="M1771.91 677.401L1772.62 676.927L1772.4 677.792L1771.91 677.401Z"
          fill="#5DBD39"
        />
      </g>
      <path
        d="M1781.34 688H1758.5V663.5H1781.34V688Z"
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
