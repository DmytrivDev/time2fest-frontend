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
      id="Gayana"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GY"
      data-label={`${t('countries.guyana')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M534.195 539.548L538.455 542.017L541.346 545.058L541.731 546.553L541.075 550.105L541.799 548.032L542.622 547.761L543.882 548.121L546.424 550.819L547.622 551.053L548.283 552.61L547.768 554.715L547.575 556.996L544.903 557.475L543.721 561.496L545.815 565.277L547.445 565.173L548.179 568.188L550.476 571.777L551.617 572.272L547.643 572.063L546.294 573.454L541.559 574.699L541.539 575.595L540.075 576.017L537.95 575.069L535.846 572.761L534.21 568.616L535.564 563.725L536.497 562.433L535.517 561.131L535.752 560.235L533.46 559.543L534.278 556.923L533.241 555.865L530.533 556.11L527.293 552.491L528.663 551.126L528.58 548.605L532.34 547.496L532.481 546.418L531.07 546.178L530.606 544.48L531.554 543.152L535.116 540.793L534.195 539.548Z"
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
