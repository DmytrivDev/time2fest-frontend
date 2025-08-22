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
      id="Austria"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AT"
      data-label={`${t('countries.Austria')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M903.876 320.52L905.256 319.28L905.521 317.749L911.495 319.499L913.532 319.202L915.032 320.275L914.511 321.905L916.115 324.135L915.73 325.999L914.365 326.202L913.376 325.733L912.464 326.322L913.584 327.364L912.537 328.249L912.85 330.421L911.803 330.384L910.897 331.312L910.324 331.676L910.548 332.634L908.615 332.306L907.964 332.822L905.162 332.77L903.235 334.322L899.048 333.447L892.949 332.478L891.339 331.051L891.688 330.015L886.412 330.723L885.693 331.884L882.975 331.301L882.537 330.489L881.256 331.437L878.657 330.098L877.995 330.069L878.334 328.78L878.871 328.181L878.501 327.108L880.407 327.119L881.792 328.155L881.501 328.775L882.928 327.843L882.97 326.796L884.995 327.114L885.605 328.015L887.61 327.645L888.808 326.796L894.037 326.218L895.532 327.557L895.699 325.999L895.058 325.926L895.537 325.135L894.287 323.452L897.501 321.843L897.725 320.614L899.084 320.932L899.621 319.306L901.475 320.452L903.876 320.52Z"
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
