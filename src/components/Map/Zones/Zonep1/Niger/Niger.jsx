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
      id="Niger"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="NE"
      data-label={`${t('countries.niger')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M890.476 463.307L898.184 465.156L901.752 467.968L905.382 466.031L906.538 473.947L908.158 476.275L908.241 477.624L910.252 479.9L909.116 482.005L907.793 497.463L902.268 503.375L898.538 509.541L897.814 509.823L898.585 513.62L897.241 513.594L894.778 514.734L892.58 516.802L887.913 515.312L883.835 515.302L880.642 516.291L878.835 518.182L875.747 517.958L871.319 515.651L869.934 515.427L865.934 517.208L862.241 513.745L858.762 512.781L854.043 513.552L851.824 514.776L849.429 519.422L848.986 523.75L845.194 520.224L842.955 520.974L843.017 522.734L841.335 520.416L842.345 520.104L841.777 518.765L839.788 519.104L836.08 516.968L836.46 515.421L837.475 515.442L835.647 514.072L834.121 513.63L832.298 510L832.309 507.526L838.002 505.677L848.481 505.255L850.361 503.515L851.939 499.895L852.158 485.969L859.919 484.432L867.877 477.323L890.476 463.307Z"
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
