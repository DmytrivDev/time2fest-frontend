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
      id="Liechtenstain"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="LI"
      data-label={`${t('countries.liechtenstain')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path d="M878 330L878.5 329L879.5 330.5L878 330Z" fill="#5DBD39" />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
