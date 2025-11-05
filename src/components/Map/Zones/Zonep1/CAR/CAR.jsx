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
      id="CAR"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CF"
      data-label={`${t('countries.central-african-republic')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M941.836 527.454L944.388 527.616L948.295 532.897L948.19 535.809L947.326 536.579L947.685 538.694L950.795 538.746L951.185 540.824L954.294 541.475L956.117 542.949L956.284 544.043L961.841 549.001L961.331 550.178L962.091 551.767L963.378 552.111L966.092 554.116L967.034 557.043L965.138 556.121L962.227 556.882L960.513 555.981L959.294 556.262L957.539 555.262L956.675 555.585L956.456 556.913L953.279 557.533L952.289 556.637L947.018 559.147L944.43 558.038L942.279 561.366L937.091 560.783L932.378 559.486L930.133 557.236L927.982 556.382L925.711 557.46L923.925 560.168L922.893 560.48L923.315 561.319L923.321 564.663L922.571 563.866L917.341 563.668L913.222 564.694L912.519 568.423L911.357 570.897L910.821 567.517L906.706 563.736L905.612 561.97L906.321 561.824L904.133 559.09L903.159 555.434L903.498 552.762L902.55 551.72L904.06 550.866L906.654 545.897L907.852 544.569L912.321 543.782L913.118 542.85L914.383 544.47L916.456 543.194L920.409 542.142L923.008 542.017L925.482 539.314L925.529 538.647L924.539 537.975L925.132 537.313L932.154 536.532L934.175 535.152L938.664 529.918L938.628 529.09L941.836 527.454Z"
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
