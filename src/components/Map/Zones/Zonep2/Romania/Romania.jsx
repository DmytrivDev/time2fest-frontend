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
      data-country="RO"
      data-label={`${t('countries.romania')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Romania"
      d="M962.983 322.587L964.931 323.384L967.623 328.176L970.264 330.988L970.925 332.801L970.071 339.212L970.806 340.108L973.238 341.509L976.785 340.197L977.873 340.743L977.957 341.566L977.717 343.79L974.993 343.681L975.217 343.02L974.441 343.139L973.644 344.686L974.649 344.775L973.394 345.431L974.149 345.452L972.915 346.983L972.628 350.473L966.144 348.145L961.915 348.691L957.186 351.129L952.743 350.41L950.55 350.775L946.904 349.858L944.425 349.921L945.024 348.353L943.415 347.587L942.545 346.592L942.91 345.644L943.816 345.634L943.472 345.217L942.311 344.743L940.899 346.03L936.883 343.941L937.863 343.446L937.587 341.879L934.003 339.853L934.196 339.504L931.436 335.998L935.962 334.837L940.628 326.873L944.477 324.504L945.884 323.535L947.389 324.358L952.774 324.535L954.54 326.024L956.561 324.738L960.347 324.327L962.983 322.587Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
