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
      id="Bahrain"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BH"
      data-label={`${t('countries.Bahrain')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1081.5 452.5L1080.5 449H1082L1081.5 452.5Z"
        fill="#FA7850"
      />
      <path
        d="M1082.4 451.673L1081.84 452.6C1081.46 453.24 1080.53 453.249 1080.13 452.615L1078.86 450.583C1078.71 450.329 1078.89 450 1079.19 450C1079.37 450 1079.53 449.872 1079.56 449.694L1079.81 448.449C1079.92 447.92 1080.42 447.57 1080.96 447.659L1082.04 447.839C1082.57 447.929 1082.94 448.429 1082.86 448.967L1082.53 451.3C1082.51 451.432 1082.46 451.559 1082.4 451.673Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
