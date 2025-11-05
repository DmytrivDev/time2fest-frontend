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
      id="Reunion"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="RE"
      data-label={`${t('countries.reunion')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1105.96 686.735L1106.87 687.178L1107.52 688.537L1106.89 689.251L1105.24 688.803L1104.58 687.808L1105.01 686.902L1105.96 686.735Z"
        fill="#F0F032"
      />
      <path
        d="M1114.5 687.501L1091 665.501V693.001H1114.5V687.501Z"
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
