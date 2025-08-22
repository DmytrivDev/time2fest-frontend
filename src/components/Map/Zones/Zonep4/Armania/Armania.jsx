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
      id="Armania"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AM"
      data-label={`${t('countries.Armania')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1054 365.121L1054.97 366.095L1054.39 366.533L1055.81 366.777L1056.96 367.788L1055.81 368.949L1058.4 371.189L1058.31 372.637L1056.82 372.835L1061.41 375.746L1060.76 376.262L1061.88 377.184L1060.89 377.392L1061.51 379.262L1059.72 379.465L1058.79 376.97L1057.82 376.481L1057.39 375.241L1056.22 375.679L1054.27 374.064L1052.79 374.444L1050.77 372.647L1047.19 372.001L1047.4 371.33L1046.75 369.944L1047.44 369.22L1047.24 367.23L1046.26 366.204L1053.28 365.564L1054 365.121Z"
        fill="#F0F032"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
