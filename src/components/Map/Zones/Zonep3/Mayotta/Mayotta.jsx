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
      id="Mayotta"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="YT"
      data-label={`${t('countries.Mayotta')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1057.1 645.761C1057.1 647.084 1056.03 648.162 1054.71 648.162C1053.38 648.162 1052.31 647.084 1052.31 645.761C1052.31 644.433 1053.38 643.36 1054.71 643.36C1056.03 643.36 1057.1 644.433 1057.1 645.761Z"
          fill="#FA7850"
        />
        <path
          d="M1054.38 645.761L1054.29 644.892L1055 645.319L1054.78 646.48L1054.38 645.761Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M1049.5 652V647L1054.5 641.5H1060L1066.5 646V652H1049.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
