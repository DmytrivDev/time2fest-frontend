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
      id="Brunei"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BN"
      data-label={`${t('countries.brunei')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1400.44 556.934L1400.45 557.642L1399.21 558.579L1399.41 561.329L1398.61 561.986L1395.88 559.158L1398.11 558.579L1400.44 556.934Z"
        fill="#F0F032"
      />
      <path
        d="M1401.1 557.6L1402.16 560.449L1401 560.23L1400.52 558.017L1401.1 557.6Z"
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
