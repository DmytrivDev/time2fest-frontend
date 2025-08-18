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
      data-country="SZ"
      data-label={`${t('countries.eswatini')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Eswatini"
      d="M986.676 712.081L989.384 713.295L989.983 713.571L990.197 717.977L989.64 717.8L989.463 720.368L985.811 720.05L983.64 717.466L983.608 715.998L985.134 713.43L986.676 712.081Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
