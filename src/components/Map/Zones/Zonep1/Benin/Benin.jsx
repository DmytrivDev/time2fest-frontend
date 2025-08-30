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
      id="Benin"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BJ"
      data-label={`${t('countries.Benin')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M845.196 520.228L848.988 523.754L848.425 525.181L849.639 526.629L850.217 529.071L849.149 530.207L849.186 531.785L847.43 533.993L846.462 536.67L844.936 536.925L844.42 542.743L844.868 546.092L844.607 550.347L839.243 551.077L840.019 550.676L839.014 548.717L839.165 537.035L837.899 534.827L837.852 532.259L835.123 530.201L835.691 527.248L836.691 527.009L836.425 526.524L838.217 524.967L841.144 525.097L842.555 523.894L843.019 522.738L842.956 520.978L845.196 520.228Z"
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
