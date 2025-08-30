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
      id="Georgia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GE"
      data-label={`${t('countries.Georgia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1033.5 354.501L1034 355.501L1036.28 357.245L1037.72 360.267L1037.92 361.635L1036.72 363.776L1041.57 364.255L1041.96 363.453L1043.16 363.432L1046.26 366.203L1053.28 365.563L1054 365.12L1055.46 364.141L1057.88 365.521L1061.93 366.266L1062.06 364.76L1059.9 363.162L1061.07 361.568L1057.03 359.625L1057.64 358.104L1053.47 356.49L1052.93 357.245L1051.63 356.427L1050.16 357.047L1048 357.501L1047.5 356.501L1046.97 356.028L1044.84 355.281L1043.25 353.912L1036.28 353.378L1032.5 351.501H1029.5L1029 353.001L1031 354.501H1033.5Z"
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
