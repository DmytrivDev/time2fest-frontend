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
      id="BurkinaFaso"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BF"
      data-label={`${t('countries.BurkinaFaso')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M828.942 506.681L832.302 507.53L832.291 510.004L834.114 513.634L835.64 514.077L837.468 515.446L836.453 515.426L836.072 516.973L839.781 519.108L841.77 518.769L842.338 520.108L841.328 520.421L843.01 522.738L842.546 523.895L841.135 525.098L838.208 524.967L836.416 526.525L836.682 527.009L835.682 527.249L830.395 526.535L828.734 527.202L817.109 527.223L816.645 528.691L817.843 534.822L817.327 535.171L815.317 532.619L811.879 532.764L809.796 534.233L807.546 533.572L806.635 532.827L805.728 530.707L803.817 530.051L803.978 526.999L804.931 526.4L805.348 524.941L805.077 523.54L804.416 523.108L808.202 521.879L809.421 520.655L809.015 518.582L810.254 518.514L809.958 517.056L811.515 514.655L814.119 516.353L815.14 515.743L815.03 513.571L816.51 514.035L817.926 511.467L819.025 510.853L820.723 511.379L821.51 509.915L825.963 508.092L827.562 506.681L828.942 506.681Z"
        fill="#F0F032"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
