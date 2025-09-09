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
      id="Honduras"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="HN"
      data-label={`${t('countries.Honduras')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M405.461 502.561L405.883 502.107L405.43 501.904L408.899 502.524L410.404 502.081L412.44 503.18L414.117 502.988L416.716 505.097L415.247 504.383L415.003 505.347L416.565 506.102L417.685 505.701L417.268 506.248L419.654 507.139L413.008 509.024L411.279 507.967L409.659 509.295L409.622 510.472L406.763 513.019L405.378 511.826L403.737 513.378L401.716 513.389L402.023 515.681L401.107 515.879L399.914 517.212L399.013 517.264L398.034 515.884L398.628 515.217L397.289 514.874L396.451 515.15L397.018 513.139L396.69 512.801L395.076 512.17L393.138 512.832L393.107 512.306L392.175 512.108L390.159 510.17L388.857 510.04L389.81 509.248L389.862 506.733L394.492 503.431L396.956 502.431L401.097 503.238L405.461 502.561Z"
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
