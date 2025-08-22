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
      id="Singapur"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SG"
      data-label={`${t('countries.singapur')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1345.37 574.895L1345.76 575.066L1344.16 575.327L1345.37 574.895Z"
        fill="#F0F032"
      />
      <path
        d="M1344 574.5L1343 576L1347 576.5V574H1345H1344V574.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
