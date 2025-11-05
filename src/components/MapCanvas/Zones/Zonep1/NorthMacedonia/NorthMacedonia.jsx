import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = e => {
    e.stopPropagation();
    const zoneId = e.currentTarget.getAttribute('data-id');
    const code = (
      e.currentTarget.getAttribute('data-country') || ''
    ).toUpperCase();
    onClick?.(zoneId, code, e);
  };

  return (
    <g
      id="NorthMacedonia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MK"
      data-label={`${t('countries.north-macedonia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M941.836 359.04L945.086 362.717L944.67 364.842L943.899 364.91L943.055 366.087L941.107 365.873L939.68 366.269L939.008 367.259L935.008 367.712L934.18 367.42L932.696 365.462L932.92 364.467L932.425 363.582L932.873 363.42L933.034 361.66L933.753 361.764L935.347 359.978L936.706 360.358L937.435 359.524L941.836 359.04Z"
        fill="#5DBD39"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
