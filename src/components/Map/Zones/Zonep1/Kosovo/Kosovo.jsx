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
      id="Kosovo"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="XK"
      data-label={`${t('countries.Kosovo')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M933 355.5L932 356L930.5 356.5V357.5L932.5 359.5L933 361.5H934L935.5 360L936.5 360.5L937.5 359.5L938 359V358.5L938.5 358L939 357L938 356L937.5 355L936.5 354.5L935.5 354L935 352.5L934 353V354L933.5 354.5L933 355.5Z"
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
