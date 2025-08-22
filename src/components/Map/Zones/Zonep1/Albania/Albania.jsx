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
      id="Albania"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AL"
      data-label={`${t('countries.Albania')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M927.263 358.974L928.674 357.052L929.299 358.151L930.58 357.672L932.533 359.442L933.039 361.661L932.877 363.422L932.429 363.583L932.924 364.468L932.7 365.463L934.184 367.422L935.012 367.713L935.325 369.198L934.08 370.187L933.184 372.25L931.731 372.766L932.158 373.864L931.617 373.833L931.393 374.682L930.19 374.526L929.372 372.432L926.638 370.25L927.403 370.807L926.7 368.906L927.736 365.328L927.148 364.474L928.059 363.068L927.815 361.937L927.018 361.849L927.153 360.364L926.617 359.875L927.263 358.974Z"
        fill="#5DBD39"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
