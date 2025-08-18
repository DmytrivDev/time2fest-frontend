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
      data-country="LB"
      data-label={`${t('countries.lebanon')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Lebanon"
      d="M1009.2 403.28L1011.61 403.348L1011.07 404.098L1011.74 404.338L1012.42 405.749L1010.97 407.077L1011.05 407.848L1009.69 407.853L1009.18 408.655L1009.6 409.26L1007.47 411.077L1006.88 411.801L1004.88 411.921L1006.27 409.187L1006.77 407.64L1007.2 407.259L1007.54 406.504L1007.58 405.681L1008.25 404.681L1009.11 403.999L1009.2 403.28Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
