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
      id="Belarus"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BY"
      data-label={`${t('countries.belarus')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M947.983 301.48L950.191 300.907L951.967 299.11L957.592 298.876L967.322 300.814L968.181 301.022L968.17 301.715L969.04 300.855L970.952 300.605L973.384 302.215L973.8 301.386L975.17 300.751L976.441 302.48L980.571 301.73L982.363 303.293L982.676 302.475L982.259 300.902L984.363 297.85L988.467 297.647L988.42 297.22L987.519 296.282L987.53 293.454L985.942 291.584L986.442 290.886L988.613 290.892L989.947 291.095L993.15 289.418L993.181 288.756L991.702 287.793L991.967 286.939L988.384 286.246L988.842 285.235L988.27 284.23L986.129 282.647L985.572 281.819L985.54 280.642L984.217 279.855L983.535 279.548L984.717 277.881L983.681 276.142L984.29 275.366L984.223 273.959L981.728 272.491L979.311 272.22L977.082 273.329L975.769 271.215L973.582 271.537L970.566 270.142C968.717 270.303 969.275 271.027 967.978 271.751L967.9 272.355L966.525 272.402L964.681 272.397L964.145 273.115L963.525 273.371L962.874 273.459L962.905 273.792L962.134 275.798L963.483 276.417L960.754 278.12L960.696 278.183L958.806 279.1L958.051 281.579L957.634 282.782L958.712 283.897L957.561 283.97L957.4 282.943L955.347 283.996L954.149 283.97L953.936 285.11L952.014 285.657L949.608 285.261L947.483 285.313L947.91 287.027L949.467 290.542L949.634 293.209L945.806 296.49L948.118 297.819L947.634 300.652"
        fill="#FA7850"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
