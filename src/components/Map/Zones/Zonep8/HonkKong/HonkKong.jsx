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
    <path
      id="HonkKong"
      className="country"
      data-tt="2"
      data-id={utc}
      data-country="HK"
      data-label={`${t('countries.honk_kong')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      d="M1396.57 470.734C1397.22 470.734 1397.74 470.208 1397.74 469.557C1397.74 468.906 1397.22 468.38 1396.57 468.38C1395.92 468.38 1395.4 468.906 1395.4 469.557C1395.4 470.208 1395.92 470.734 1396.57 470.734Z"
      stroke="#272727"
      strokeWidth="0.500002"
      strokeLinecap="round"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
