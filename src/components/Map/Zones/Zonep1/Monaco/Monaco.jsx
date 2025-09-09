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
      id="Monaco"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MC"
      data-label={`${t('countries.Monaco')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path d="M865 351L865.5 352L867 351H865Z" fill="#5DBD39" />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
