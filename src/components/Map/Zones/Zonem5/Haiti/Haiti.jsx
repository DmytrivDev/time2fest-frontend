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
      id="Haiti"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="HT"
      data-label={`${t('countries.Haiti')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M476.651 490.432L475.25 488.859L476.63 487.859L475.875 487.031L477.026 485.682L476.479 485.38L476.463 483.245L473.724 483.187L471.489 482L468.849 482.427L468.052 483.115L471.37 484.401L471.916 487.203L473.484 488.427L473.495 489.229L472.573 489.177L471.734 489.766L469.76 489.641L468.5 489.375L467.297 489.349L464.333 488.49L463.359 488.729L463 489.844L463.135 490.167L464.318 490.453L465.214 491.037L466.042 491.839L466.875 490.745L468.208 490.667L471.401 491.198L473.151 490.766L475.453 490.969L476.458 491.807L476.62 490.49L476.651 490.432Z"
        fill="#FA7850"
      />
      <path
        d="M470.517 488.152L468.809 487.225L470.142 487.309L471.325 488.189L470.517 488.152Z"
        fill="#FA7850"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
