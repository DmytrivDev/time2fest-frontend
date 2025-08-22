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
      id="Cambodia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="KH"
      data-label={`${t('countries.cambodia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1345.9 531.949L1345.13 530.376L1345.93 530.011L1346.34 530.99L1345.9 531.949Z"
        fill="#FA7850"
      />
      <path
        d="M1363.5 508.575L1362.52 511.622L1363.95 515.107L1363.32 517.7L1363.52 520.44L1357.95 522.393L1358.14 523.893L1356 523.367L1354.95 524.143L1355.21 525.737L1356.89 527.383L1356.85 528.346L1354.84 527.216L1351.86 527.711L1351.83 527.695L1351.5 527.622V527.57L1351.01 528.867L1348.16 530.127L1345.53 529.169L1343.8 529.435L1343.73 528.752L1344.4 528.534L1343.75 526.44L1343.09 527.758L1341.91 527.909L1341.36 526.044L1341.72 524.784L1340.98 524.534L1341.22 524.081L1340.51 523.096L1340.59 524.049L1339.96 520.133L1338.61 518.903L1338.63 517.2L1337.79 515.69L1337.83 514.758L1339.69 513.091L1340.68 511.305L1343.16 510.19L1350.51 510.127L1351.38 511.039L1351.95 510.388L1352.88 511.591L1354.56 511.607L1355.41 512.492L1356.35 512.549L1356.72 511.794L1355.87 510.279L1358.55 509.143L1358.96 509.794L1360.72 510.456L1363.51 508.575"
        fill="#FA7850"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
