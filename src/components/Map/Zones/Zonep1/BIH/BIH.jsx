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
      id="BIH"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BA"
      data-label={`${t('countries.bosnia-and-herzegovina')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M914.862 341.187L915.909 341.832L922.873 342.306L925.388 343.713L926.946 343.509L925.727 346.614L928.258 348.65L927.341 349.187L926.414 348.885L927.784 350.843L926.279 351.744L924.857 351.879L925.602 353.036L924.43 352.885L922.737 354.765L923.091 356.999L922.498 357.583L918.534 355.65L918.159 355.317L918.586 354.812L917.565 354.031L916.784 352.223L911.571 347.801L910.576 345.119L909.05 343.963L909.399 341.682L910.758 341.723L912.081 342.848L912.992 341.478L914.862 341.187Z"
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
