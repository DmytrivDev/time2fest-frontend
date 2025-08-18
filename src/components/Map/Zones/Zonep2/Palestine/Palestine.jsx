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
    <g
      id="Palestine"
      className="countryGr"
      data-tt="2"
      data-id="UTC+2"
      data-country="PS"
      data-label={`${t('countries.palestine')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
    >
      <path d="M1001.86 420.161L1000.76 422.234L1000.51 421.65L1001.86 420.161Z" fill="#14D2DC" />
      <path
        d="M1005.41 414.947L1007.12 415.786L1006.75 420.708L1004.07 421.51L1004.19 420.124L1005.47 419.364L1004.5 418.5L1004.38 418.031L1004.61 415.843L1005.41 414.947Z"
        fill="#14D2DC"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
