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
      id="EastTimor"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TL"
      data-label={`${t('countries.east-timor')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1460.84 623.254L1461.29 623.77L1459.84 624.988L1450.34 628.91L1450.84 626.77L1449.65 626.327L1450.73 624.718L1460.84 623.254Z"
          fill="#5DBD39"
        />
        <path
          d="M1447.24 627.467L1446.61 628.952L1445.07 628.259L1447.24 627.467Z"
          fill="#5DBD39"
        />
      </g>
      <path
        d="M1462.93 626.445L1452.49 630.794C1452.19 630.923 1451.83 630.889 1451.55 630.703L1450.95 630.297C1450.67 630.111 1450.5 629.799 1450.5 629.465V629.123C1450.5 629.041 1450.51 628.96 1450.53 628.881L1450.78 627.898C1450.9 627.391 1450.62 626.872 1450.12 626.707L1449.89 626.631C1449.64 626.547 1449.37 626.567 1449.13 626.685L1447.74 627.381C1447.58 627.459 1447.45 627.576 1447.35 627.721L1447.05 628.168C1446.75 628.627 1446.13 628.752 1445.67 628.445L1445.08 628.055C1445.03 628.018 1444.98 627.977 1444.93 627.93L1444.6 627.598C1444.08 627.084 1444.27 626.21 1444.95 625.955L1451.5 623.5L1460.27 621.191C1460.7 621.078 1461.16 621.262 1461.39 621.644L1463.4 625.008C1463.72 625.531 1463.49 626.211 1462.93 626.445Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
