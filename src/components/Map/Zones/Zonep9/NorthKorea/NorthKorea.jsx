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
    onClick?.(zoneId, code);
  };

  return (
    <path
      id="NorthKorea"
      className="country"
      data-tt="2"
      data-id={utc}
      data-country="KP"
      data-label={`${t('countries.north_korea')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1473.98 354.831L1473.23 357.618L1471.21 358.63L1469.9 360.04L1465.18 361.204L1466.25 363.37L1465.4 364.499L1461.18 364.046L1459.72 362.864L1459.23 362.054L1458.38 362.396L1455 367.37L1453.32 367.726L1446.58 372.331L1445.97 372.845L1447.32 373.726L1448.02 374.786L1448.84 373.984L1450.41 375.073L1451.46 375.142L1451 379.454L1453.03 380.386L1452.95 380.708L1450.47 380.55L1449.84 382.107L1448.57 383.388L1450.41 384.818L1451.43 386.144L1452.75 384.095L1454.86 385.515L1456.85 384.935L1458.27 385.359L1458.25 385.253L1459.81 382.982L1464.39 382.573L1465.16 382.47L1466.41 381.091L1466.47 380.941L1463.86 377.847L1461.9 377.462L1461.81 376.21L1462.52 376.021L1462.57 374.04L1467.78 371.901L1473.36 367.538L1473.43 364.042L1474.6 361.108L1476.84 359.224L1477.79 358.837L1476.18 356.671L1475.79 355.511L1473.98 354.831Z"
      fill="#5DBD39"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
