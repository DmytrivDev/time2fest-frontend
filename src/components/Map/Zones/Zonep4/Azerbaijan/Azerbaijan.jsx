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
      id="Azerbaijan"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AZ"
      data-label={`${t('countries.azerbaijan')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1061.08 361.562L1062.62 361.765L1065.84 365.291L1067.53 365.702L1071.68 361.827L1076.28 368.385L1077.34 369.359L1078.91 369.317L1080.36 370.463L1080.58 371.343L1078.11 370.603L1076.58 371.458L1075.15 375.353L1075.69 376.791L1075 376.64L1074.44 378.64L1073.54 377.489L1073.13 381.754L1071.7 381.9L1068.8 379.228L1070.35 378.192L1069.49 377.364L1070.31 376.364L1068.65 374.374L1065.66 375.885L1061.52 379.254L1060.9 377.385L1061.88 377.176L1060.77 376.254L1061.42 375.739L1056.83 372.827L1058.32 372.629L1058.41 371.181L1055.82 368.942L1056.96 367.78L1055.82 366.77L1054.4 366.525L1054.98 366.088L1054 365.114L1055.46 364.135L1057.89 365.515L1061.93 366.26L1062.06 364.754L1059.91 363.155L1061.08 361.562Z"
        fill="#F0F032"
      />
      <path
        d="M1054.26 374.055L1056.22 375.669L1057.38 375.232L1057.82 376.472L1058.78 376.961L1059.71 379.456L1056.24 378.623L1052.95 374.873L1052.78 374.435L1054.26 374.055Z"
        fill="#F0F032"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
