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
      data-country="BI"
      data-label={`${t('countries.burundi')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Burundi"
      d="M979.396 593.334L980.235 593.829L982.474 593.772L982.027 596.49L983.818 596.636L983.73 598.063L982.714 598.589L980.547 601.97L977.938 603.917L976.35 600.402L976.074 598.555L975.913 598.405L975.865 597.157L974.803 595.49L975.146 594.74L976.808 595.777L979.245 595.037L979.396 593.334Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
