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
      id="SanMarino"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SM"
      data-label={`${t('countries.SanMarino')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path d="M891 351L892.333 349L893.5 351H891Z" fill="#5DBD39" />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
