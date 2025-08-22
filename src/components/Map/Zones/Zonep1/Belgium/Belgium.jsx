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
      id="Belgium"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BE"
      data-label={`${t('countries.Belgium')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M854.742 301.653L856.279 301.867L857.075 303.226L858.445 303.023L860.003 303.851L859.32 306.508L860.904 306.528L862.815 309.351L861.513 310.617L860.977 310.268L859.575 312.398L860.232 313.315L859.893 314.377L858.284 314.627L857.836 313.877L855.31 312.763L854.898 310.476L853.075 311.799L851.685 311.586L851.888 309.685L851.128 309.138L849.523 309.44L849.065 308.268L847.523 308.075L846.898 306.528L845.341 306.815L844.039 305.523L843.727 304.346L847.831 302.492L848.06 303.263L848.758 303.018L850.242 303.554L852.128 302.648L852.445 303.216L852.195 302.482L854.742 301.653Z"
        fill="#5DBD39"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
