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
      id="Tunisia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TN"
      data-label={`${t('countries.tunisia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M876.089 389.093L879.006 388.099L879.662 389.104L880.001 388.526L880.745 388.531L882.287 390.646L881.907 391.229L882.693 391.583L885.089 389.76L885.886 389.677L886.037 390.885L884.485 393.083L883.225 393.635L882.891 394.989L884.048 396.89L885.657 398.151L886.266 399.943L884.271 403.135L880.698 405.948L881.698 408.01L882.902 408.838L884.11 408.505L884.053 409.687L885.771 409.005L886.412 411.224L888.193 411.5L888.141 415.703L885.162 417.12L882.104 419.583L881.74 424.786L880.11 426.916L878.344 427.588L876.094 417.953L872.474 415.031L872.193 413.271L869.375 410.125L868.261 407.265L868.453 406.265L872.079 402.765L872.948 399.911L872.136 395.885L872.579 393.666L871.646 392.864L873.818 390.349L876.089 389.093Z"
        fill="#5DBD39"
      />
      <path
        d="M884.916 408.907L884.322 407.501L885.859 408.016L884.916 408.907Z"
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
