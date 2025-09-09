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
      id="FrenchPolinesia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PF"
      data-label={`${t('countries.FrenchPolinesia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.957 616.828H153.14V646.47H125.957V616.828Z"
        fill="#FA7850"
      />
      <path
        className="blueH"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.953 616.824V617.211L126.34 616.824H125.953ZM130.582 616.824L125.953 621.453V625.697L134.824 616.824H130.582ZM139.068 616.824L125.953 629.939V634.181L143.312 616.824L139.068 616.824ZM147.555 616.824L125.953 638.426V642.668L151.797 616.824L147.555 616.824ZM153.135 619.729L126.397 646.467H130.639L153.135 623.971L153.135 619.729ZM153.135 628.213L134.881 646.467H139.125L153.135 632.455L153.135 628.213ZM153.135 636.697L143.367 646.467H147.609L153.135 640.941V636.697ZM153.135 645.186L151.854 646.467H153.135V645.186Z"
        fill="#14D2DC"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
