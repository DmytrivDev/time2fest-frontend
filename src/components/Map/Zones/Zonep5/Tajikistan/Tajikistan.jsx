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
      id="Tajikistan"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TJ"
      data-label={`${t('countries.tajikistan')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1179.93 366.64L1181.57 368.484L1179.44 370.281L1181.3 371.515L1182.49 371.302L1180.1 373.27L1180.38 372.63L1177.45 371.52L1175.43 372.036L1174.7 373.083L1174.3 372.802L1174.21 375.453L1178.18 375.213L1182.77 376.104L1185.14 375.052L1185.3 375.88L1186.26 376L1186.47 376.947L1188.79 377.432L1190.07 376.369L1195.72 375.906L1195.54 377.197L1196.68 378.807L1195.96 379.265L1196.49 380.75L1199.11 380.427L1201.71 382.046L1202.44 386.989L1203.25 387.671L1201.96 388.671L1198.78 387.671L1195.76 388.682L1195.99 388.114L1193.95 387.395L1190.78 389.901L1185.82 391.812L1184.7 389.588L1185.33 384.671L1183.91 384.369L1184.28 383.515L1182.53 381.63L1181.35 381.817L1178.41 384.77L1179.02 385.859L1178.39 386.963L1175.34 386.697L1174.21 389.374L1172.42 388.161L1169.19 389.4L1167.85 390.452L1166.63 388.963L1166.82 387.494L1169.56 383.004L1168.32 381.681L1168.62 379.093L1166.22 378.447L1164.59 376.869L1164.96 375.739L1166.32 374.905L1170.34 375.348L1170.9 373.556L1171.57 372.812L1171.94 373.457L1172.01 372.353L1172.72 372.207L1170.9 371.655L1174.14 371.582L1173.75 369.405L1174.44 368.207L1176.33 368.947L1179.93 366.64Z"
        fill="#5DBD39"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
