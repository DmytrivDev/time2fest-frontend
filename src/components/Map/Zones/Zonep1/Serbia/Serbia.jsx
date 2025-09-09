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
      id="Serbia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="RS"
      data-label={`${t('countries.Serbia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M928.663 335.613L931.423 335.993L934.183 339.499L933.991 339.848L937.574 341.874L937.85 343.441L936.871 343.936L940.887 346.025L942.298 344.738L943.459 345.212L943.803 345.629L942.897 345.64L942.532 346.588L943.402 347.582L941.923 350.249L942.694 352.098L945.006 353.812L942.251 356.009L942.793 358.041L941.829 359.035L937.428 359.52L936.699 360.353L935.34 359.973L933.746 361.759L933.027 361.655L932.522 359.436L930.569 357.666L930.361 356.483L931.944 355.978L926.267 351.733L927.772 350.832L926.402 348.874L927.329 349.176L928.246 348.639L925.715 346.603L926.934 343.499L925.376 343.702L925.788 341.697L927.163 341.41L924.725 339.389L924.709 337.092L928.663 335.613Z"
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
