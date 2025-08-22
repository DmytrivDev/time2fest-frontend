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
    <g
      id="Oman"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="OM"
      data-label={`${t('countries.Oman')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1108.73 449.921L1110.13 448.296L1110.89 448.562L1109.97 449.353L1110.62 449.785L1109.67 452.197L1109.06 452.009L1108.73 449.921Z"
        fill="#F0F032"
      />
      <path
        d="M1108.22 455.654L1108.72 456.941L1110.19 455.67L1111.41 458.311L1113.67 460.826L1117.89 462.316L1121.17 462.701L1125.68 468.259L1127.18 468.472L1127.2 470.066L1124.92 474.092L1122.81 475.696L1120.82 479.404L1119.61 479.696L1119.22 479.42L1119.53 478.514L1118.68 478.691L1116.69 483.045L1117.44 486.686L1112.37 488.024L1110.74 491.342L1108.96 492.201L1105.59 492.696L1104.63 494.279L1104.4 496.066L1103.56 496.868L1098.91 496.873L1094.05 498.774L1088.54 486.733L1103.39 481.592L1106.2 471.764L1104.42 467.566L1105.74 461.071L1108.41 460.441L1107.28 459.613L1107.45 457.134L1108.22 455.654Z"
        fill="#F0F032"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
