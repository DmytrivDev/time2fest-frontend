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
    <path
      className="country"
      data-tt="2"
      data-id="UTC+2"
      data-country="LV"
      data-label={`${t('countries.latvia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Latvia"
      d="M955.343 256.52L960.056 258.16L962.416 260.442L964.186 259.666L966.624 260.358L969.009 261.962L967.988 265.265L969.421 265.39L970.639 268.348L970.561 270.134L969.514 270.358L967.895 272.348L964.676 272.39L964.139 273.108L962.869 273.452L958.025 270.139L955.587 269.879L954.343 268.03L952.41 269.249L950.655 269.358L948.541 268.66L945.301 268.983L944.858 268.358L939.936 268.457L935.343 270.645L934.947 269.436L935.343 265.494L937.134 263.697L937.166 262.108L938.692 260.077L942.926 259.363L945.785 261.9L946.806 263.822L947.832 264.301L949.577 264.118L951.968 261.717L951.494 257.952L955.343 256.52Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
