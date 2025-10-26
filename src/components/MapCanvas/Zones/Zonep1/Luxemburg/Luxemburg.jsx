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
      id="Luxemburg"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="LU"
      data-label={`${t('countries.Luxemburg')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M860.969 310.267L861.505 310.616L861.63 311.59L863.318 313.131L862.63 315.055L859.886 314.376L860.224 313.313L859.568 312.397L860.969 310.267Z"
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
