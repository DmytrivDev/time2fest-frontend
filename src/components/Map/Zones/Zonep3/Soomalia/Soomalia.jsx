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
      id="Soomalia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SO"
      data-label={`${t('countries.Soomalia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1073.12 526L1081.12 523.438L1082.28 522.339L1084.91 523.011L1083.97 525.563L1084.37 529.282L1084.04 529.834L1084.47 529.464L1085.62 529.98L1083.11 530.599L1082.79 535.021L1079.52 540.527L1077.82 542.443L1073.34 552.396L1068.44 559.855L1064.33 564.36L1056.78 571.146L1046.38 578.709L1038.83 586.355L1036.85 590.188L1034.08 586.183L1034.02 567.886L1038.57 562.182L1039.66 561.11L1042.67 560.735L1047.34 557.677L1053.78 557.453L1068.73 542.213H1063.78L1048.89 537.104L1046.12 535.099L1042.33 529.13L1043.71 527.218L1045.22 524.88L1046.37 525.708L1047.25 527.307L1050.87 530.166L1053.62 530.109L1058.2 528.124L1060.94 528.791L1065.76 526.327L1073.12 526Z"
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
