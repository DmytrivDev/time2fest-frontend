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
      id="Taiwan"
      className="country"
      data-tt="2"
      data-id={utc}
      data-country="TW"
      data-label={`${t('countries.taiwan')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      d="M1432.44 454.12L1435.01 455.506L1432.43 463.782L1429.45 470.089L1429.29 471.714L1428.58 471.563L1426.3 467.547L1425.52 465.625L1425.72 463.334L1429.91 455.844L1432.44 454.12Z"
      fill="#F0F032"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
