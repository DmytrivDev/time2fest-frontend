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
      id="SaintVincentSndGrenadines"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="VC"
      data-label={`${t('countries.saint-vincent-and-the-grenadines')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M527.186 517.458L527.72 516.932L527.108 518.141L527.186 517.458Z"
          fill="#F0F032"
        />
        <path
          d="M527.435 518.526L527.968 518L527.357 519.209L527.435 518.526Z"
          fill="#F0F032"
        />
        <path
          d="M528.621 515.854L528.273 516.578L527.819 516.135L528.314 515.271L528.621 515.854Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M532 520H524V514.592L532 514.593V520Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
