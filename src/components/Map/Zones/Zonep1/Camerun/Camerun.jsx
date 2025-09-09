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
      id="Camerun"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CM"
      data-label={`${t('countries.Camerun')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M900.85 516.787L902.922 517.193L903.162 518.235L904.475 519.303L906.006 524.214L905.521 526.839L905.823 528.506L907.152 530.912L908.714 532.256L901.407 532.334L900.266 533.954L906.516 540.079L908.23 543.423L907.86 544.579L906.662 545.907L904.068 550.876L902.558 551.73L903.506 552.772L903.167 555.444L904.141 559.1L906.329 561.834L905.62 561.98L906.714 563.746L910.829 567.527L911.365 570.907L910.813 571.22L910.672 573.689L908.876 572.345L904.881 572.011L903.37 571.064L896.948 571.194L896.631 570.699L888.73 570.449L887.631 570.496L887.276 571.168H881.381L879.709 570.298L880.287 565.72L878.401 563.084L879.49 562.314L878.797 562.293L879.427 561.407L878.172 561.59L878.313 562.173L877.334 562.48L875.735 561.704L874.891 558.918L874 558.6L873.589 559.585L873.672 558.074L874.886 555.251L875.011 553.017L881.354 547.178L882.651 547.808L883.188 547.652L883.573 546.558L886.594 549.996L887.636 549.694L889.959 546.814L889.516 545.944L891.756 541.34L891.776 540.235L894.453 538.423L895.094 535.355L896.641 534.386L896.808 532.319L897.453 531.694L898.339 528.865L900.344 525.975L901.349 526.022L903.625 524.376L903.636 521.668L902.829 520.688L901.355 520.142L900.85 516.787Z"
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
