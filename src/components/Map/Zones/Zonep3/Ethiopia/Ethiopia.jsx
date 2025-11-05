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
      id="Ethiopia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="ET"
      data-label={`${t('countries.ethiopia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1011.98 510.961L1014.74 510.773L1015.83 509.904L1016.48 510.836L1016.92 510.747L1018.82 507.633L1021.82 510.081L1025.1 508.904L1025.44 510.081L1027.48 509.148L1028.54 509.82L1029.83 509.362L1033.48 511.435L1041.02 519.846L1038.16 523.612L1037.99 527.305L1038.79 527.56L1042.04 526.768L1043.7 527.216L1042.33 529.128L1046.11 535.096L1048.88 537.102L1063.78 542.211H1068.73L1053.78 557.451L1047.34 557.675L1042.67 560.732L1039.66 561.107L1038.56 562.18L1034.99 562.373L1033.01 560.654L1028.47 562.732L1026.74 564.993L1019.83 564.008L1012.86 559.93L1009.56 559.868L1009.04 558.998L1008.22 557.956L1008.48 555.514L1007.68 555.18L1007.65 555.185L1006.51 555.076L1005.27 554.087L1003.12 549.045L1000.53 546.972L998.005 543.909L994.51 542.488L995.682 539.956L998.239 540.102L999.744 539.639L999.895 534.962L1001.16 531.014L1000.87 529.441L1002.35 527.816L1003.25 528.508L1004.27 527.738L1005.12 522.868L1007.84 518.868L1010.04 518.665L1011.98 510.961Z"
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
