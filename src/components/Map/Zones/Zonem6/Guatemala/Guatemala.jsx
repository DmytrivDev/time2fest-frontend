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
    <g
      id="Guatemala"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GT"
      data-label={`${t('countries.Guatemala')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M386.087 492.761L389.853 492.771L389.478 502.574L391.035 502.553L392.223 503.167L393.124 502.808L392.603 502.225L394.494 503.428L389.863 506.73L389.811 509.246L388.858 510.037L387.733 510.261L388.046 510.99L385.634 512.417L385.181 513.433L382.551 512.506L379.134 512.355L374.541 509.381L375.389 506.652L374.827 505.917L375.014 505.245L376.744 502.261L378.212 501.646L383.442 501.631L383.697 499.923L378.546 495.636L380.791 495.605L380.796 492.761L386.087 492.761Z"
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
