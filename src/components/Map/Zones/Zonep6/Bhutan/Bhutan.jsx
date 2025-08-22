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
      id="Bhutan"
      className="country"
      data-tt="2"
      data-id={utc}
      data-country="BT"
      data-label={`${t('countries.bhutan')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      d="M1271.26 443.255L1271.13 443.489L1270.47 444.146L1270.97 444.432L1271.02 444.547L1271.04 444.656L1271.21 445.041L1271.26 445.031L1271.44 445.197L1271.57 445.401L1271.74 445.333L1271.85 445.364L1271.91 445.411L1272.14 445.734L1272.92 445.911L1273.49 445.708L1273.51 445.713L1274.36 445.974L1274.86 446.198L1275.43 446.531L1275.91 446.51L1275.89 446.427L1276.73 446.359L1277.73 445.744L1277.89 445.729L1278.12 445.713L1278.6 445.484L1278.91 445.729L1279.11 445.823L1279.17 445.88L1279.37 445.974L1280.28 446.151L1281.37 446.109L1281.4 446.115L1281.65 446.12L1281.85 446.068L1283.49 445.948L1284.52 445.959L1285.31 445.896L1285.59 445.787L1285.86 445.714L1285.95 445.933L1286.07 446L1286.93 445.657L1287.09 445.386L1287.02 445.063L1286.64 444.568L1286.6 444.099L1286.62 444.037L1286.98 443.532L1286.78 442.834L1285.38 442.537L1285.2 442.427L1284.84 442.193L1284.64 441.974L1284.62 441.875L1284.55 441.646L1284.84 440.881L1284.9 439.953L1283.97 439.572L1283.79 439.52L1282.8 439.203L1281.62 439.729C1280.75 439.261 1278.9 439.24 1278.9 439.24L1278.8 439.214L1278.67 439.203L1278.49 438.266L1277.17 437.964L1274.28 439.214L1273.86 439.677L1272.29 441.756H1272.31L1271.43 442.881L1271.35 443.037"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
