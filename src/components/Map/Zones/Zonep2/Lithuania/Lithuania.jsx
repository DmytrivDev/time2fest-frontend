import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = (e) => {
    e.stopPropagation();              // не віддаємо подію зоні
    const zoneId = e.currentTarget.getAttribute('data-id');          // "UTC+2"
    const code   = (e.currentTarget.getAttribute('data-country') || '').toUpperCase(); // "CY"
    onClick?.(zoneId, code);
  };

  return (
    <path
      className="country"
      data-tt="2"
      data-id="UTC+2"
      data-country="LT"
      data-label={`${t('countries.lithuania')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Luthuania"
      d="M954.343 268.04L955.588 269.889L958.025 270.149L962.869 273.462L962.129 275.801L963.478 276.42L958.801 279.103L957.629 282.785L958.707 283.899L957.556 283.972L957.395 282.946L955.343 283.998L954.145 283.972L953.931 285.113L951.817 285.712L947.478 285.316L946.661 283.295L944.853 282.311L943.921 282.483L943.713 280.04L944.239 279.613L942.999 277.634L940.411 277.941L936.39 276.41L935.343 270.655L939.937 268.467L944.858 268.368L945.301 268.993L948.541 268.67L950.655 269.368L952.41 269.259L954.343 268.04Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
