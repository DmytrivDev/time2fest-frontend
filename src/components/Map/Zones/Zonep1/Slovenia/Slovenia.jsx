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
      id="Slovenia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SI"
      data-label={`${t('countries.Slovenia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M911.782 331.307L912.246 332.734L913.34 333.765L911.782 333.427L911.725 334.374L910.709 334.333L908.767 335.317L908.814 336.89L906.683 338.442L907.319 338.895L906.511 340.213L903.912 339.599L903.246 338.776L902.944 339.343L901.017 339.927L898.413 339.911L899.032 339.208L899.98 338.916L898.412 337.823L898.522 336.765L897.944 336.369L898.793 335.619L897.485 334.843L899.037 333.453L903.225 334.328L905.152 332.776L907.954 332.828L908.605 332.312L910.537 332.64L910.314 331.682L910.886 331.317L911.782 331.307Z"
        fill="#5DBD39"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
