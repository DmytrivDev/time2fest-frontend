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
      id="WestSahara"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="EH"
      data-label={`${t('countries.WestSahara')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M765.929 441.414H788.246V450.279H771.746V463.669L768.819 464.591L767.34 465.565L766.168 467.19L766.798 474.68H747.413L746.741 477.649L747.402 471.576L749.491 469.55L752.986 461.456L757.35 457.242L757.793 453.805L759.475 449.378L763.605 446.732L765.929 441.414Z"
        fill="#5DBD39"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
