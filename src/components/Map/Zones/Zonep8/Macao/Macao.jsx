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
    <path
      id="Macao"
      className="country"
      data-tt="2"
      data-id={utc}
      data-country="MO"
      data-label={`${t('countries.macao')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      d="M1391.64 471.067C1392.29 471.067 1392.82 470.541 1392.82 469.89C1392.82 469.239 1392.29 468.713 1391.64 468.713C1390.99 468.713 1390.46 469.239 1390.46 469.89C1390.46 470.541 1390.99 471.067 1391.64 471.067Z"
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
