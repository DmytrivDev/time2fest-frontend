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
      id="WallisAndFutuna"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="WF"
      data-label={`${t('countries.wallis-and-futuna')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1734.31 653.401C1734.31 654.724 1733.22 655.803 1731.91 655.803C1730.57 655.803 1729.5 654.724 1729.5 653.401C1729.5 652.079 1730.57 651 1731.91 651C1733.22 651 1734.31 652.079 1734.31 653.401Z"
          fill="#F0F032"
        />
        <path
          d="M1733.64 653.068C1733.64 654.391 1732.56 655.469 1731.24 655.469C1729.91 655.469 1728.84 654.391 1728.84 653.068C1728.84 651.745 1729.91 650.667 1731.24 650.667C1732.56 650.667 1733.64 651.745 1733.64 653.068Z"
          fill="#F0F032"
        />
        <path
          d="M1743.51 648.108C1743.51 649.431 1742.42 650.509 1741.11 650.509C1739.77 650.509 1738.7 649.431 1738.7 648.108C1738.7 646.785 1739.77 645.707 1741.11 645.707C1742.42 645.707 1743.51 646.785 1743.51 648.108Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M1734.5 656H1748.5V643.5H1725.5V658.5H1734.5V656Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
