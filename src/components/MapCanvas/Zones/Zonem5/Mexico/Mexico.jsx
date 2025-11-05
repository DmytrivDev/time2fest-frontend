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
      id="Mexico"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MX"
      data-label={`${t('countries.mexico')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M401.728 478.588L400.806 478.806L400.535 480.27L401.743 478.572L401.728 478.588Z"
        fill="#FA7850"
      />
      <path
        d="M400.501 473.534L398.11 473.915L399.292 474.144L397.808 473.977L397.415 475.815L397.831 476.526L396.618 479.685L395.644 479.493L395.302 480.19L393.112 480.394L389.124 484.153L389.854 485.255V492.774L390.038 492.024L390.282 492.097L390.354 491.983L391.394 492.151L393.073 489.499L393.923 489.36L393.993 489.319L395.267 487.518L395.126 489.384L396.267 490.909L398.183 485.149L397.136 485.499L398.46 483.811L397.251 484.143L396.854 483.327L398.069 482.596L398.329 480.602L401.757 475.78L401.392 474.29L400.501 473.534Z"
        fill="#FA7850"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
