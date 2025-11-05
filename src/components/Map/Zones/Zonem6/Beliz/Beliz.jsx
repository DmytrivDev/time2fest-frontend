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
      id="Beliz"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BZ"
      data-label={`${t('countries.belize')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M389.854 492.774V492.778L389.479 502.571L391.036 502.552L391.04 502.554L393.573 499.485L394.469 497.142L394.063 496.329L395.036 489.97L393.651 490.017L393.969 489.356L393.993 489.323L393.934 489.356L393.229 489.366L392.567 490.601L391.245 492.388L391.393 492.155L390.354 491.988L390.282 492.101L390.036 492.029L389.854 492.774Z"
        fill="#14D2DC"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
