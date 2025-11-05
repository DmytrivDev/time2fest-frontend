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
      id="Malta"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MT"
      data-label={`${t('countries.malta')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M903.009 396.813L902.113 395.782L902.952 396.11L903.009 396.813Z"
          fill="#5DBD39"
        />
        <path
          d="M903.578 397.186L903.318 395.845L903.88 396.549L903.578 397.186Z"
          fill="#5DBD39"
        />
      </g>
      <path
        className="noBg"
        d="M906.5 400H900V393.5H906.5V400Z"
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
