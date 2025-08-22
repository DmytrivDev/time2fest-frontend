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
      id="CaymanIslands"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="KY"
      data-label={`${t('countries.CaymanIslands')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M428.768 485.401L428.064 484.802L429.7 484.942L428.768 485.401Z"
          fill="#FA7850"
        />
        <path
          d="M431.849 484L431.234 484.016C431.104 484.021 430.995 484.13 431 484.266C431.005 484.396 431.114 484.5 431.25 484.495L431.865 484.479C431.995 484.474 432.099 484.365 432.094 484.235C432.094 484.099 431.984 483.995 431.849 484Z"
          fill="#FA7850"
        />
        <path
          d="M434.849 483L434.234 483.016C434.104 483.021 433.995 483.13 434 483.266C434.005 483.396 434.114 483.5 434.25 483.495L434.865 483.479C434.995 483.474 435.099 483.365 435.094 483.235C435.094 483.099 434.984 482.995 434.849 483Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M438.5 489H425V479H438.5V489Z"
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
