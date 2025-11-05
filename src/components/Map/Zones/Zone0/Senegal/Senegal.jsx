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
      id="Senegal"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SN"
      data-label={`${t('countries.senegal')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M753.755 519.547L754.375 519.026L754.261 518.667L753.729 519.412L751.834 518.579L751.141 519.167L753.755 519.547ZM749.328 501.725L750.62 499.386L753.188 499.548L756.646 498.646L760.172 498.818L762.657 501.298L764.474 501.391L765.605 503.886L770.532 508.292L771.813 513.345L771.375 513.605L772.928 515.428L773.735 515.397L774.724 517.121L774.844 520.173L768.875 520.412L765.026 518.876L763.261 518.813L757.511 518.793L748.391 520.6L748.037 519.673L749.313 519.079L748.198 519.376L748.224 516.892L752.459 516.386L755.48 515.308L756.026 514.407L760.11 515.991L762.625 515.313L762.49 514.626L759.631 514.543L757.605 513.272L755.334 513.188L754.495 513.965L749.141 514.22L748.865 512.949L748.464 513.319L748.256 512.907L748.698 512.147L748.172 512.277L748.146 512.933L747.917 511.532L746.256 509.053L744.36 508.371L746.099 507.631L748.329 504.699L749.271 503.022L749.328 501.725Z"
        fill="#F0F032"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
