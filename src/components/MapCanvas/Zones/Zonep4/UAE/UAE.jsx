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
      id="UAE"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AE"
      data-label={`${t('countries.uae')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1097.36 460.161L1096.61 459.89L1097.71 459.421L1098.24 459.921L1097.36 460.161Z"
        fill="#F0F032"
      />
      <path
        d="M1108.73 449.921L1109.06 452.009L1109.67 452.197L1110.12 453.332L1110.18 455.661L1108.71 456.931L1108.22 455.645L1107.44 457.124L1107.28 459.603L1108.41 460.431L1105.74 461.062L1104.42 467.556L1091.41 466.332L1086.61 460.249L1086.5 458.968L1086.74 459.645L1087.41 459.754L1087.58 460.786L1088.22 461.015L1093.71 460.124L1097.63 460.489L1098.84 459.911L1098.83 459.312L1100.34 459.452L1101.61 456.999L1107.08 452.062L1108.73 449.921Z"
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
