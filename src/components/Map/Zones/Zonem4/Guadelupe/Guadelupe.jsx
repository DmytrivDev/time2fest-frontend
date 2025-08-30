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
      id="Guadelupe"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GP"
      data-label={`${t('countries.Guadelupe')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M526.115 500.494L526.422 501.489L525.724 502.218L525.208 500.697L526.115 500.494Z"
          fill="#F0F032"
        />
        <path
          d="M527.208 499.761L528.323 500.802L526.604 500.901L527.208 499.761Z"
          fill="#F0F032"
        />
        <path
          d="M528.128 502.201L527.951 502.67L527.623 502.253L528.128 502.201Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M531 503.327H523V498H531V503.327Z"
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
