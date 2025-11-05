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
      id="Yemen"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="YE"
      data-label={`${t('countries.yemen')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1097.21 520.667L1095.01 519.485L1095.99 518.615L1097.23 519.047L1098.98 518.688L1101.09 519.453L1099.12 520.448L1097.21 520.667Z"
        fill="#FA7850"
      />
      <path
        d="M1088.53 486.733L1094.04 498.775L1091 499.869L1089.4 502.322L1089.66 503.994L1084.95 506.067L1075.51 508.9L1074.25 509.504L1072.06 511.963L1068.72 511.91L1065.38 514.009L1057.18 515.478L1054.36 517.572L1054.19 518.39L1052.44 518.27L1050.99 518.838L1046.29 518.817L1045.12 515.853L1045.41 513.843L1044.45 512.213L1042.96 506.213L1042.1 506.035L1042.73 505.676L1042.97 506.02L1042.94 500.119L1045 498.619L1044.66 496.541L1045.69 494.525L1047.14 494.556L1048.67 495.395L1053.74 494.749L1062.51 495.52L1063.77 497.197L1065.9 496.514L1069.66 491.035L1074.25 488.712L1088.53 486.733Z"
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
