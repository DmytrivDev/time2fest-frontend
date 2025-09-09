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
      data-country="RU"
      data-label={`${t('countries.russia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Russia_11"
      d="M934.809 276.133L935.017 276.206L932.82 278.352L934.486 278.794L936.158 277.914L936.398 276.399L940.418 277.93L943.007 277.623L944.247 279.602L943.721 280.029L943.929 282.471L937.913 282.711L929.137 281.966L932.148 280.289L930.106 280.055L928.413 281.841L928.299 281.794L929.83 279.992L929.768 278.857L931.398 278.404L934.809 276.133Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
