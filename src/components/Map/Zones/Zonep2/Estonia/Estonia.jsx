import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = (e) => {
    e.stopPropagation();              // не віддаємо подію зоні
    const zoneId = e.currentTarget.getAttribute('data-id');          // "UTC+2"
    const code   = (e.currentTarget.getAttribute('data-country') || '').toUpperCase(); // "CY"
    onClick?.(zoneId, code);
  };

  return (
    <g
      id="Estonia"
      className="countryGr"
      data-tt="2"
      data-id="UTC+2"
      data-country="EE"
      data-label={`${t('countries.estonia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M957.583 245.907L957.343 244.979L958.354 245.651L964.661 246.563L968.75 246.776L969.812 246.313L970.401 246.787L966.885 251.438L967.135 255.5L968.807 258.042L967.484 258.349L966.625 260.365L964.187 259.672L962.416 260.448L960.057 258.167L955.343 256.526L951.495 257.959L952.625 254.62L952.166 254.308L951.031 255.105L949.13 254.568L947.458 252.938L947.656 251.896L949.317 251.495L947.172 251.448L947.369 250.266L948.14 250.027L947.104 249.626L947.302 248.277L950.432 247.6L951.453 246.756L957.583 245.907Z"
        fill="#14D2DC"
      />
      <path
        d="M943.503 249.427L944.732 250.937L942.607 251.864L941.998 250.697L940.43 250.166L943.503 249.427Z"
        fill="#14D2DC"
      />
      <path
        d="M943.956 252.64L946.571 253.723L941.477 255.692L940.159 257.687L940.972 256.088L939.336 255.078L939.878 254.515L939.237 253.437L940.513 253.812L942.196 252.848L943.956 252.64Z"
        fill="#14D2DC"
      />
      <path
        d="M945.783 253L945.408 252.594L946.132 252.177L946.913 253.104L945.783 253Z"
        fill="#14D2DC"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
