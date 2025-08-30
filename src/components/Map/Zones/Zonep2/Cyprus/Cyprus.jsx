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
      data-country="cy"
      data-label={`${t('countries.cyprus')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Cyprus"
      d="M1002.38 397.462L997.753 399.321L994.187 399.103V399.833L992.374 400.364L991.655 401.071L990.905 400.915L991.577 402.677L992.749 403.233L994.587 403.321L995.874 402.942L997.562 402.218L998.015 401.462L998.552 401.511L999.003 401.505L999.94 401.552L999.19 399.618L1002.38 397.462Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
