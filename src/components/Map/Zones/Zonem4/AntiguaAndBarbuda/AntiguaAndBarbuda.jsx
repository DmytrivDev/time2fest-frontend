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
      id="AntiguaAndBarbuda"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AG"
      data-label={`${t('countries.AntiguaAndBarbuda')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M525.111 496.305L526.136 496.122L526.774 496.904L525.202 497.229L525.111 496.305Z"
          fill="#F0F032"
        />
        <path
          d="M525.604 492L526.719 493.042L525 493.141L525.604 492Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M531 498H523V488H531V498Z"
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
