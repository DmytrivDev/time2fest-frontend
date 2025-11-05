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
      id="SouthKorea"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="KR"
      data-label={`${t('countries.south-korea')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1467.64 402.826L1467.1 401.983L1468.26 401.629L1467.64 402.826Z"
        fill="#5DBD39"
      />
      <path
        d="M1456.97 385.413L1457.26 386.621L1456.63 386.47L1456.97 385.413Z"
        fill="#5DBD39"
      />
      <path
        d="M1466.44 381.093L1466.57 380.729L1471.51 389.161L1471.64 395.411L1472.52 395.26L1472.01 397.692L1470.89 400.249L1469.89 400.9L1467.78 400.135L1467.96 401.005L1466.92 401.479L1466.97 402.213L1464.85 400.994L1463.61 401.536L1462.99 403.39L1462.41 401.984L1461.84 403.051L1462.36 403.604L1461.68 404.312L1460.44 403.9L1461.49 402.848L1461.06 402.676L1458.75 403.63L1457.47 405.317L1456.2 403.223L1457.89 403.452L1456.73 402.848L1458.08 402.411L1456.73 402.51L1456.12 400.718L1456.94 401.197L1456.51 399.827L1458.15 398.239L1457.2 397.864L1458.72 397.02L1457.9 396.171L1459.16 395.338L1457.33 394.931L1457.24 391.504L1455.53 391.317L1456.33 390.234L1456.39 391.161L1456.6 390.051L1457.17 390.817L1457.36 389.718L1458.01 390.52L1458.73 390.223L1458.99 391.348L1459.81 390.416L1458.65 389.77L1459.11 389.155L1458.24 389.249L1459.09 388.52L1457.59 386.322L1457.57 385.723L1458.51 386.411L1458.28 385.254L1459.84 382.984L1465.16 382.51L1466.44 381.093Z"
        fill="#5DBD39"
      />
      <path
        d="M1456.71 404.16L1455.3 404.634L1456.04 403.707L1456.71 404.16Z"
        fill="#5DBD39"
      />
      <path
        d="M1464.44 401.866L1464.98 403.018L1464.05 402.861L1463.89 402.127L1464.44 401.866Z"
        fill="#5DBD39"
      />
      <path
        d="M1457.24 409.64L1459.5 409.848L1457.71 411.161L1456.12 411.379L1455.59 410.9L1457.24 409.64Z"
        fill="#5DBD39"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
