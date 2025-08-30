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
      data-country="MD"
      data-label={`${t('countries.moldova')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Moldova"
      d="M967.356 321.267L974.799 324.517L975.424 324.334L975.924 325.079L975.382 327.256L976.939 328.694L977.512 328.397L977.153 329.741L979.356 331.631L979.121 333.366L980.283 334.199L977.788 334.423L976.96 333.699L975.741 334.439L974.705 333.73L974.205 336.767L972.335 338.491L972.434 339.204L970.799 340.111L970.064 339.215L970.918 332.803L970.257 330.991L967.616 328.178L964.924 323.386L962.976 322.589L964.085 321.839L965.934 321.892L967.356 321.267Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
