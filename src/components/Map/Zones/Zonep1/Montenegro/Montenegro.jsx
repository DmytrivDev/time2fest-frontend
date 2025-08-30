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
      id="Montenegro"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="ME"
      data-label={`${t('countries.Montenegro')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M922.489 357.573L923.083 356.99L922.729 354.755L924.422 352.875L925.593 353.026L924.849 351.87L926.271 351.734L931.948 355.979L930.364 356.484L930.573 357.667L929.291 358.146L928.666 357.047L928.39 357.25L926.609 359.87L927.146 360.359L927.01 361.844L922.948 358.422L923.708 358.594L924.005 358.021L922.729 358.266L922.489 357.573Z"
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
