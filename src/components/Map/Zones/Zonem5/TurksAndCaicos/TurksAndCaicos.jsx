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
      id="TurksAndCaicos"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TC"
      data-label={`${t('countries.TurksAndCaicos')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M475.621 472.481L476.225 472.1L476.517 472.418L475.621 472.481Z"
          fill="#FA7850"
        />
        <path
          d="M478.906 468L479.214 468.995L478.516 469.724L478 468.203L478.906 468Z"
          fill="#FA7850"
        />
        <path
          d="M481.604 471L482.719 472.042L481 472.141L481.604 471Z"
          fill="#FA7850"
        />
        <path
          d="M474.849 470L474.235 470.016C474.104 470.021 473.995 470.13 474 470.266C474.006 470.396 474.115 470.5 474.25 470.495L474.865 470.479C474.995 470.474 475.099 470.365 475.094 470.235C475.094 470.099 474.985 469.995 474.849 470Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M486 476H472.5V466H486V476Z"
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
