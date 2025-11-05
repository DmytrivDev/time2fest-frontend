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
      id="Chad"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TD"
      data-label={`${t('countries.chad')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M905.383 466.027L910.336 463.684L949.934 484.153V503.56L945.565 503.497L944.684 504.315L943.362 508.695L941.934 509.346L942.737 511.544L940.487 513.299L941.466 515.424L939.205 518.253L939.888 519.003L941.471 518.695L942.429 522.029L943.184 521.909L942.815 524.112L944.846 525.998L944.388 527.617L941.835 527.456L938.627 529.091L938.664 529.919L934.174 535.154L931.914 536.68L925.164 537.388L924.528 537.951L925.528 538.649L925.481 539.315L923.007 542.019L920.408 542.143L916.455 543.196L914.382 544.472L913.117 542.852L912.32 543.784L907.851 544.571L908.221 543.414L906.507 540.071L900.257 533.945L901.398 532.326L908.705 532.248L907.143 530.904L905.815 528.498L905.512 526.831L905.997 524.206L904.466 519.294L903.153 518.227L902.914 517.185L900.841 516.779L898.575 513.622L897.804 509.826L898.528 509.544L902.257 503.378L907.783 497.466L909.106 482.007L910.242 479.903L908.231 477.627L908.148 476.278L906.528 473.95L905.372 466.033L905.383 466.027Z"
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
