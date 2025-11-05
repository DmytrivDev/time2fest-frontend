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
          d="M29.6876 550.174C29.6876 551.503 28.6147 552.576 27.2865 552.576C25.9636 552.576 24.8906 551.503 24.8906 550.174C24.8906 548.852 25.9635 547.773 27.2865 547.773C28.6146 547.773 29.6876 548.852 29.6876 550.174Z"
          fill="#5DBD39"
        />
        <path
          d="M31.1717 552.828C31.1717 554.151 30.0987 555.229 28.7706 555.229C27.4477 555.229 26.3695 554.151 26.3695 552.828C26.3695 551.5 27.4476 550.427 28.7706 550.427C30.0987 550.427 31.1717 551.5 31.1717 552.828Z"
          fill="#5DBD39"
        />
        <path
          d="M41.4837 583.788C41.4837 585.111 40.4107 586.189 39.0826 586.189C37.7597 586.189 36.6815 585.111 36.6815 583.788C36.6815 582.465 37.7596 581.387 39.0826 581.387C40.4107 581.387 41.4837 582.465 41.4837 583.788Z"
          fill="#5DBD39"
        />
      </g>
      <path
        d="M1737.77 438.521C1737.77 439.849 1736.69 440.922 1735.37 440.922C1734.04 440.922 1732.97 439.849 1732.97 438.521C1732.97 437.198 1734.04 436.125 1735.37 436.125C1736.69 436.125 1737.77 437.198 1737.77 438.521Z"
        fill="#5DBD39"
      />
      <path
        d="M1727 442V428.5H1738.5V442H1727Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />{' '}
      <path
        d="M0 590.5V539H52V557H36V565L46.5 590.5H0Z"
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
