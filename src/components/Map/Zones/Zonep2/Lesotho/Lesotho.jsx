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
      data-country="LS"
      data-label={`${t('countries.lesotho')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Lesotho"
      d="M973.023 727.255L976.252 729.963L976.95 731.401L975.351 733.568L975.523 734.401L971.533 735.911L970.231 738.453L969.497 738.406L966.669 736.651L964.888 733.052L966.289 732.333L968.346 729.255L973.023 727.255Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
