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
    <path
      id="Kyrkyzstan"
      className="country"
      data-tt="2"
      data-id={utc}
      data-country="KG"
      data-label={`${t('countries.kyrkyzstan')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      d="M1195.73 375.895L1190.07 376.358L1188.8 377.421L1186.48 376.937L1186.27 375.989L1185.3 375.869L1185.15 375.041L1182.78 376.093L1178.19 375.202L1174.22 375.442L1174.31 372.791L1174.71 373.072L1175.44 372.025L1177.46 371.51L1180.39 372.619L1180.11 373.26L1182.92 371.098L1184.4 370.957L1186.04 371.838L1187.78 371.181L1188.66 370.004L1189.6 370.457L1189.37 369.181L1190.78 369.676L1193.24 367.754L1188.5 366.817L1188.37 365.671L1187.41 365.682L1186.39 364.15L1185.65 363.947L1185.62 364.932L1184.84 364.796L1184.76 366.067L1181.58 365.426L1181.08 364.041L1179.98 364.426L1178.57 363.739L1183.95 359.728L1182.01 359.02L1184.33 356.51L1188.25 356.421L1195.13 358.447L1194.63 357.275L1195.14 355.52L1196.23 354.406L1198.07 353.791L1204.5 355.937L1206.29 355.359L1219.65 355.65L1223.07 356.187L1224.31 358.062L1226.81 358.333L1228.29 359.775L1228.43 360.656L1220.64 363.671L1218.45 365.885L1212.39 366.567L1209.08 370.656L1208.41 370.369L1205.99 370.963L1205.3 368.958L1203.56 370.072L1201.62 369.77L1201.85 370.755L1197.64 372.307L1197.2 375.031L1195.73 375.895"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
