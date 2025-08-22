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
      id="Gambia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GM"
      data-label={`${t('countries.Gambia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M754.502 513.961L755.341 513.185L757.611 513.268L759.637 514.539L762.497 514.622L762.632 515.31L760.117 515.987L756.033 514.403L755.486 515.304L752.466 516.382L748.231 516.888L747.861 515.513L748.512 514.763L749.903 516.096L751.174 515.768L751.122 515.091L755.429 514.716L751.054 515.002L750.054 515.513L749.148 514.216L754.502 513.961Z"
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
