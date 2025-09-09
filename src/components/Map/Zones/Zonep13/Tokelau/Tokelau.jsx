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
      id="Tokelau"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TK"
      data-label={`${t('countries.tokelau')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1764.57 627.561C1764.57 628.889 1763.49 629.962 1762.17 629.962C1760.84 629.962 1759.77 628.889 1759.77 627.561C1759.77 626.238 1760.84 625.16 1762.17 625.16C1763.49 625.16 1764.57 626.238 1764.57 627.561Z"
          fill="#E3C57F"
        />
        <path
          d="M1767.77 628.468C1767.77 629.791 1766.71 630.869 1765.37 630.869C1764.05 630.869 1762.97 629.791 1762.97 628.468C1762.97 627.14 1764.05 626.067 1765.37 626.067C1766.71 626.067 1767.77 627.139 1767.77 628.468Z"
          fill="#E3C57F"
        />
        <path
          d="M1761.64 624.321C1761.64 625.644 1760.56 626.722 1759.24 626.722C1757.92 626.722 1756.84 625.644 1756.84 624.321C1756.84 622.993 1757.92 621.92 1759.24 621.92C1760.56 621.92 1761.64 622.993 1761.64 624.321Z"
          fill="#E3C57F"
        />
      </g>
      <path
        d="M1740.5 633H1776.5V612.5H1730V619.5L1740.5 633Z"
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
