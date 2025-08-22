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
      id="Keniya"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="KE"
      data-label={`${t('countries.Keniya')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1009.04 559.001L1009.56 559.871L1012.86 559.933L1019.83 564.011L1026.74 564.996L1028.47 562.735L1033.01 560.657L1034.99 562.376L1038.56 562.183L1034.02 567.886L1034.07 586.184L1036.84 590.189L1034.21 592.012L1034.08 591.33L1033.45 591.658L1033.97 593.121L1033.38 592.97L1031.88 594.46L1030.38 595.022L1029.76 598.028L1028.16 599.486L1028.47 600.199L1028.09 601.262L1027.19 601.637L1027.47 602.205L1026.9 603.705L1025.19 605.028L1017.36 599.278L1017.73 597.679L1015.39 595.736L999.746 587.022L1000.33 586.21L999.673 585.434L1000.41 583.996L1001.6 584.476L1001.94 583.543L1003.63 583.366L1002.98 582.387L1001.14 582.861L1000.89 583.851L999.412 581.976L999.438 580.757L1002.03 576.382L1003.45 575.83L1004.39 572.241L1004.06 569.486L1002.18 566.476L1001.73 563.778L1000.33 563.205L999.417 560.981L1001.35 559.064L1007.84 559.017L1009.04 559.001Z"
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
