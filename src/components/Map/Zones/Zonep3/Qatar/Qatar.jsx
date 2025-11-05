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
      id="Qatar"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="QA"
      data-label={`${t('countries.qatar')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1083.44 451.214L1083.78 450.042L1084.67 449.516L1086.41 450.813L1086.02 452.656L1086.57 454.307L1086.5 457L1085 459L1084 458.5L1083.36 457.708L1082.74 456.88L1082.44 454.901L1083.44 451.214Z"
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
