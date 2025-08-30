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
      id="CotdIvoare"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CI"
      data-label={`${t('countries.CotdIvoare')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M798.195 530.468L798.237 528.916L799.523 529.322L799.398 528.785L800.18 528.577L800.466 531.051L801.383 531.275L802.518 530.103L803.82 530.051L805.732 530.707L806.638 532.827L807.55 533.572L809.8 534.233L811.883 532.765L815.32 532.619L817.331 535.171L817.846 534.822L817.445 536.989L818.346 538.322L818.8 541.056L817.008 543.499L815.164 548.317L816.102 553.041L817.56 554.848L817.622 556.468L816.648 556.629L817.018 556.26L815.685 556.411L815.518 555.629L815.049 555.582L814.878 556.504L811.346 555.884L812.409 555.744L809.685 555.681L807.388 556.072L811.289 555.942L802.138 556.973L793.893 560.338L793.586 558.067L794.477 555.838L794.378 553.067L791.971 550.791L790.279 550.593L788.539 549.64L789.794 548.442L790.159 547.187L789.216 544.4L790.451 544.478L791.279 542.051L791.805 542.124L791.399 541.301L790.326 540.999L790.362 540.046L791.794 539.723L793.258 540.332L792.482 538.457L791.768 538.244L792.846 536.869L792.32 535.171L791.357 535.265L790.826 534.275L790.862 532.234L791.675 531.411L793.3 530.015L796.336 531.499L796.737 530.505L798.195 530.468Z"
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
