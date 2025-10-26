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
      data-country="EG"
      data-label={`${t('countries.egypt')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Egypt"
      d="M991.29 426.574L992.342 427.897L992.008 427.361L991.29 426.574ZM955.633 419.881L956.352 420.652L959.764 420.064L969.316 422.871L973.488 423.574L974.831 424.371L980.107 421.902L980.722 422.241L980.503 421.944L981.592 421.012L984.696 420.142L987.41 421.006L989.003 420.475L988.535 421.866L990.238 423.017L990.956 422.496L990.571 421.845L992.498 423.09L995.159 423.183L1000.5 421.652L1000.75 422.236L1003.9 431.631L1000.69 441.079L998.274 439.517L995.654 436.642L995.332 434.251L993.087 431.809L992.212 429.074L991.222 431.027L993.831 436.548L997.368 440.47L999.285 445.241L999.18 446.855L1005.07 458.09L1008.11 461.121L1006.78 461.137L1007.5 465.345L1004.35 466.86L1003.03 469.595L1000.43 470.194L999.931 471.241L999.688 472.41L997.557 472.778L995.304 471.241H987.04L986.962 470.1L986.165 470.824L954.883 471.241L954.649 432.396L953.436 428.037L954.738 425.459L954.217 421.438L955.633 419.881Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
