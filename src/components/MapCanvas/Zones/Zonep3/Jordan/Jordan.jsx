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
      id="Jordan"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="JO"
      data-label={`${t('countries.jordan')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1023.17 410.347L1024.48 416.227L1025.68 416.644L1025.01 417.222L1014.26 420.67L1019.23 426.097L1016.78 428.816L1013.04 429.576L1009.68 433.237L1004.2 432.305L1004.29 431.305L1006.75 420.701L1007.12 415.779L1007.32 414.161L1007.72 414.133L1008.16 413.826L1009.74 415.102L1013.5 416.196L1023.17 410.347Z"
        fill="#FA7850"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
