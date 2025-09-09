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
      id="Mauritus"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MU"
      data-label={`${t('countries.Mauritus')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1129.29 666.002C1129.29 667.325 1128.22 668.403 1126.89 668.403C1125.56 668.403 1124.49 667.325 1124.49 666.002C1124.49 664.679 1125.56 663.601 1126.89 663.601C1128.22 663.601 1129.29 664.679 1129.29 666.002Z"
          fill="#F0F032"
        />
        <path
          d="M1103.32 661.202C1103.32 662.53 1102.24 663.603 1100.92 663.603C1099.59 663.603 1098.52 662.53 1098.52 661.202C1098.52 659.879 1099.59 658.806 1100.92 658.806C1102.24 658.806 1103.32 659.879 1103.32 661.202Z"
          fill="#F0F032"
        />
        <path
          d="M1113.36 633.388C1113.36 634.717 1112.28 635.789 1110.96 635.789C1109.63 635.789 1108.56 634.717 1108.56 633.388C1108.56 632.065 1109.63 630.987 1110.96 630.987C1112.28 630.987 1113.36 632.065 1113.36 633.388Z"
          fill="#F0F032"
        />
        <path
          d="M1147.38 680.669C1147.38 681.997 1146.31 683.07 1144.99 683.07C1143.66 683.07 1142.59 681.997 1142.59 680.669C1142.59 679.346 1143.66 678.267 1144.99 678.267C1146.31 678.267 1147.38 679.346 1147.38 680.669Z"
          fill="#F0F032"
        />
        <path
          d="M1116.17 682.202L1116.95 682.728L1117.13 683.811L1116.37 684.754L1115.06 684.743L1116.17 682.202Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M1118 619.501L1091 637.001V665.501L1114.5 687.501H1165V673.001L1118 619.501Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
