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
      id="Faroe"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="FO"
      data-label={`${t('countries.Faroe')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M798.182 227.013L797.708 226.097L796.906 226.18L796.078 225.107L797.068 225.034L798.406 225.904L798.182 227.013Z"
          fill="#F0F032"
        />
        <path
          d="M798.222 229.4L797.009 228.155L798.217 228.551L798.222 229.4Z"
          fill="#F0F032"
        />
        <path
          d="M798.169 232.08L796.685 230.361L797.893 230.913L798.169 232.08Z"
          fill="#F0F032"
        />
        <path
          d="M798.876 226.147L798.751 224.662L799.506 225.548L798.876 226.147Z"
          fill="#F0F032"
        />
        <path
          d="M795.489 227.293L794.447 226.335L795.38 226.22L796.281 226.798L795.489 227.293Z"
          fill="#F0F032"
        />
        <path
          d="M797.889 227.947L795.785 226.332L795.54 225.108L797.175 226.327L797.889 227.947Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M800.5 223.5H795C794.448 223.5 794 223.948 794 224.5V233C794 233.552 794.448 234 795 234H800.5C801.052 234 801.5 233.552 801.5 233V224.5C801.5 223.948 801.052 223.5 800.5 223.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
