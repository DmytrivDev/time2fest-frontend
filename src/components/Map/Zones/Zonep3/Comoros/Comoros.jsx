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
      id="Comoros"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="KM"
      data-label={`${t('countries.Comoros')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1053.4 642.828C1053.4 644.151 1052.32 645.229 1051 645.229C1049.67 645.229 1048.59 644.151 1048.59 642.828C1048.59 641.505 1049.67 640.427 1051 640.427C1052.32 640.427 1053.4 641.505 1053.4 642.828Z"
          fill="#FA7850"
        />
        <path
          d="M1049.69 643.428C1049.69 644.756 1048.62 645.829 1047.29 645.829C1045.97 645.829 1044.89 644.756 1044.89 643.428C1044.89 642.105 1045.97 641.032 1047.29 641.032C1048.62 641.032 1049.69 642.105 1049.69 643.428Z"
          fill="#FA7850"
        />
        <path
          d="M1048.04 639.481C1048.04 640.809 1046.96 641.882 1045.64 641.882C1044.31 641.882 1043.23 640.809 1043.23 639.481C1043.23 638.158 1044.31 637.085 1045.64 637.085C1046.96 637.085 1048.04 638.158 1048.04 639.481Z"
          fill="#FA7850"
        />
        <path
          d="M1050.1 643.241C1050.1 644.569 1049.03 645.642 1047.7 645.642C1046.37 645.642 1045.3 644.569 1045.3 643.241C1045.3 641.918 1046.37 640.845 1047.7 640.845C1049.03 640.845 1050.1 641.918 1050.1 643.241Z"
          fill="#FA7850"
        />
        <path
          d="M1046.24 641.254L1045.05 640.306L1045.58 638.421L1046.24 641.254Z"
          fill="#FA7850"
        />
        <path
          d="M1067.68 639.401C1067.68 640.729 1066.6 641.802 1065.28 641.802C1063.95 641.802 1062.87 640.729 1062.87 639.401C1062.87 638.078 1063.95 637 1065.28 637C1066.6 637 1067.68 638.078 1067.68 639.401Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M1053.82 637H1071V646H1066.5L1060 641.5H1054.5L1049.5 647H1038.5V632.5H1053.82V637Z"
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
