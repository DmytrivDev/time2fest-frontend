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
      id="SaudiArabia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SA"
      data-label={`${t('countries.SaudiArabia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1025.01 417.227L1031.21 418.247L1039.32 422.898L1052.47 433.149L1061.57 433.711L1066.36 434.883L1067.18 436.675L1070.8 436.701L1072.83 441.638L1074.9 442.086L1075.12 442.362L1074.3 442.612L1079.38 446.727L1078.59 446.378L1078.63 447.258L1079.64 448.346L1079.34 450.06L1078.75 449.242L1078.6 450.294L1082.74 456.873L1083.36 457.701L1084.65 457.55L1085.85 457.711L1084.96 459.138L1086.45 459.466L1086.78 460.544L1091.41 466.336L1104.42 467.56L1106.19 471.758L1103.38 481.586L1088.54 486.727L1074.25 488.706L1069.67 491.029L1065.9 496.508L1063.77 497.191L1062.51 495.514L1053.75 494.743L1048.67 495.389L1047.14 494.55L1045.7 494.519L1044.67 496.534L1045 498.612L1042.95 500.112L1041.75 496.946L1040.86 496.826L1040.57 494.701L1037.04 491.222L1031.29 481.472L1029.6 480.185L1027.97 479.8L1025.06 475.914L1024.37 470.05L1024.91 469.144L1021.46 461.93L1019 459.789L1017.19 459.461L1016.18 457.982L1015.5 454.701L1012.94 451.591L1012.83 450.253L1011.85 449.68L1005.47 439.768L1004.66 439.024L1002.82 438.92L1002.56 439.492L1002.29 439.159L1004.2 432.31L1009.68 433.242L1013.05 429.581L1016.79 428.821L1019.23 426.102L1014.26 420.675L1025.01 417.227Z"
        fill="#FA7850"
      />
      <path
        d="M1038.38 496.92L1038.89 498.191L1038.24 497.608L1038.38 496.92Z"
        fill="#FA7850"
      />
      <path
        d="M1038.89 498.4L1039.42 497.926L1039.88 499.171L1038.89 498.4Z"
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
