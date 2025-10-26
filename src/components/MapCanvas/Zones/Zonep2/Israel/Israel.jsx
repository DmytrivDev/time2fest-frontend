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
      data-country="IL"
      data-label={`${t('countries.israel')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Israel"
      d="M1001.86 420.16L1003.07 417.868L1004.88 411.92L1006.89 411.801L1007.47 411.083L1007.6 411.928L1007.43 413.002L1007.32 414.172L1007.12 415.78L1005.42 414.941L1004.61 415.837L1004.39 418.025L1004.2 418.723L1004.92 418.863L1005.48 419.358L1004.2 420.118L1004.07 421.504L1006.75 420.702L1003.9 431.629L1000.76 422.233L1001.86 420.16Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
