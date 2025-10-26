import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = (e) => {
    e.stopPropagation();              // не віддаємо подію зоні
    const zoneId = e.currentTarget.getAttribute('data-id');          // "UTC+2"
    const code   = (e.currentTarget.getAttribute('data-country') || '').toUpperCase(); // "CY"
    onClick?.(zoneId, code, e);
  };

  return (
    <path
      className="country"
      data-tt="2"
      data-id="UTC+2"
      data-country="BG"
      data-label={`${t('countries.bulgaria')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Bulgaria"
      d="M943.41 347.587L945.019 348.353L944.42 349.92L946.899 349.858L950.545 350.774L952.738 350.41L957.181 351.129L961.91 348.691L966.139 348.144L972.623 350.472L972.05 352.738L971.488 352.457L969.285 353.842L969.181 356.764L967.019 358.191L968.181 358.415L969.8 361.051L967.441 361.363L966.358 360.452L962.686 361.551L961.623 362.66L960.186 362.696L960.483 364.764L959.326 365.035L956.066 365.353L953.972 364.764L952.29 363.525L948.087 364.634L944.67 364.842L945.087 362.717L941.837 359.04L942.8 358.045L942.259 356.014L945.014 353.816L942.701 352.103L941.931 350.254L943.41 347.587Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
