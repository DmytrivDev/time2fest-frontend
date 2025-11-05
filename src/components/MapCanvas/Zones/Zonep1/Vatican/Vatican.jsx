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
      id="Vatican"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="VA"
      data-label={`${t('countries.vatican-city')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path d="M894 362.5L895 361L896 362.5H894Z" fill="#5DBD39" />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
