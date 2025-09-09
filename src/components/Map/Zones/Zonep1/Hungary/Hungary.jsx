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
      id="Hungary"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="HU"
      data-label={`${t('countries.Hungary')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M934.076 320.587L937.66 320.8L938.753 322.009L940.785 321.613L944.467 324.509L940.618 326.879L935.951 334.842L931.425 336.004L928.665 335.623L924.712 337.103L921.618 338.202L919.769 338.004L916.889 336.769L913.342 333.764L912.248 332.733L911.785 331.306L910.889 331.316L911.795 330.389L912.842 330.426L912.529 328.254L913.576 327.369L912.456 326.327L913.368 325.738L914.357 326.207L915.722 326.004L916.107 324.139L916.524 324.061L916.946 324.233L919.165 325.817L922.774 325.749L924.441 325.369L924.05 324.561L925.014 323.843L927.868 322.869L930.43 323.103L932.456 321.296L934.076 320.587Z"
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
