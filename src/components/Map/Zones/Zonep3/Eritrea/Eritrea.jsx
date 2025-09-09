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
      id="Eritrea"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="ER"
      data-label={`${t('countries.Eritrea')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1011.98 510.961L1011.61 506.268L1014.06 499.841L1014.24 496.623L1016.39 496.742L1019.31 494.247L1020.56 494.175L1022.21 491.867L1024.48 496.888L1025.51 502.086L1026.44 504.409L1027.71 505.768L1027.63 506.466L1028.42 506.164L1027.99 505.117L1028.49 504.596L1029.9 507.164L1031.96 507.378L1034.86 508.945L1037.4 512.43L1040.1 513.961L1040.86 516.065L1041.92 516.513L1042.91 517.935L1043.98 517.732L1044.58 518.654L1042.49 520.388L1041.02 519.846L1033.48 511.435L1029.83 509.362L1028.53 509.82L1027.48 509.148L1025.44 510.081L1025.1 508.904L1021.82 510.081L1018.82 507.633L1016.92 510.747L1016.48 510.836L1015.83 509.904L1014.74 510.773L1011.98 510.961Z"
        fill="#FA7850"
      />
      <path
        d="M1030.62 504.228L1028.95 503.957L1028.94 502.582L1029.81 503.014L1029.94 503.842L1030.53 503.546L1031.16 503.936L1030.62 504.228"
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
