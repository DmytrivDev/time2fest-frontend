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
      id="FrenchPolinesia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PF"
      data-label={`${t('countries.FrenchPolinesia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M167.873 699.495C167.873 700.818 166.8 701.896 165.472 701.896C164.149 701.896 163.071 700.818 163.071 699.495C163.071 698.167 164.149 697.094 165.472 697.094C166.8 697.094 167.873 698.167 167.873 699.495Z"
          fill="#FA7850"
        />
        <path
          d="M165.473 698.268C165.473 699.596 164.4 700.669 163.077 700.669C161.749 700.669 160.676 699.596 160.676 698.268C160.676 696.945 161.749 695.867 163.077 695.867C164.4 695.867 165.473 696.945 165.473 698.268Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M160 709.413V693.5H174V709.413H160Z"
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
