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
      id="PuertoRico"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PR"
      data-label={`${t('countries.PuertoRico')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M499.008 489.214L505.31 489.662L506.258 490.375L504.909 491.943L498.971 492.105L498.32 489.922L499.008 489.214Z"
        fill="#F0F032"
      />
      <path
        d="M509.5 495.5H495.5V485.5H509.5V495.5Z"
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
