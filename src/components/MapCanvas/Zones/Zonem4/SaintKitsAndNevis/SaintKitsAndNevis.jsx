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
      id="SaintKitsAndNevis"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="KN"
      data-label={`${t('countries.saint-kitts-and-nevis')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M518 495.337L519.072 495.566L519.278 497.155L518 495.337Z"
          fill="#F0F032"
        />
        <path
          d="M520.849 498L520.235 498.016C520.104 498.021 519.995 498.13 520 498.266C520.006 498.396 520.115 498.5 520.25 498.495L520.865 498.479C520.995 498.474 521.099 498.365 521.094 498.235C521.094 498.099 520.985 497.995 520.849 498Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M523 500H515V494H523V500Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
