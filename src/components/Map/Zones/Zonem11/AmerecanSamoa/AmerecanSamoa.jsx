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
      id="AmerecanSamoa"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AS"
      data-label={`${t('countries.AmerecanSamoa')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1771.8 638.401C1771.8 639.724 1770.73 640.802 1769.4 640.802C1768.08 640.802 1767 639.724 1767 638.401C1767 637.073 1768.08 636 1769.4 636C1770.73 636 1771.8 637.073 1771.8 638.401Z"
          fill="#5DBD39"
        />
        <path
          d="M1770.44 653.148C1770.44 654.471 1769.36 655.549 1768.04 655.549C1766.72 655.549 1765.64 654.471 1765.64 653.148C1765.64 651.82 1766.72 650.747 1768.04 650.747C1769.36 650.747 1770.44 651.82 1770.44 653.148Z"
          fill="#5DBD39"
        />
        <path
          d="M1776.57 652.841C1776.57 654.164 1775.49 655.242 1774.17 655.242C1772.84 655.242 1771.77 654.164 1771.77 652.841C1771.77 651.518 1772.84 650.44 1774.17 650.44C1775.49 650.44 1776.57 651.518 1776.57 652.841Z"
          fill="#5DBD39"
        />
        <path
          d="M1768.31 653.068L1768.03 653.495L1767.55 653.25L1768.31 653.068Z"
          fill="#5DBD39"
        />
      </g>
      <path
        d="M1781.5 633V663.5H1759V658H1765.5V633H1781.5Z"
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
