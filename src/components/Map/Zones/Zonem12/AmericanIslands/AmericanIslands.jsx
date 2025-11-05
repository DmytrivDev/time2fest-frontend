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
      id="AmericanIslands"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="US"
      data-label={`${t('countries.united-states-minor-outlying-islands')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1741.24 577.934C1741.24 579.262 1740.16 580.335 1738.84 580.335C1737.51 580.335 1736.44 579.262 1736.44 577.934C1736.44 576.611 1737.51 575.533 1738.84 575.533C1740.16 575.533 1741.24 576.611 1741.24 577.934Z"
          fill="#F0F032"
        />
        <path
          d="M1741.77 580.828C1741.77 582.151 1740.69 583.229 1739.37 583.229C1738.05 583.229 1736.97 582.151 1736.97 580.828C1736.97 579.5 1738.05 578.427 1739.37 578.427C1740.69 578.427 1741.77 579.5 1741.77 580.828Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M1760 590.5V570H1721.5V590.5H1760Z"
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
