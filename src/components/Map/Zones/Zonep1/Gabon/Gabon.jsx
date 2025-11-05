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
      id="Gabon"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GA"
      data-label={`${t('countries.gabon')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M880.729 594.921L881.411 594.645L879.63 594.098L880.729 594.921ZM888.724 570.442L896.625 570.692L896.943 571.187L896.406 572.625L896.411 575.843L899.443 574.823L901.604 575.146L902.568 577.349L902.135 578.833L900.995 579.718L899.932 583.062L902.995 584.994L902.552 586.562L902.734 590.26L900.984 594.239L899.776 594.073L899.229 592.276L898.521 593.401L895.495 593.619L894.213 591.218L892.781 591.192L892.286 593.161L890.969 593.807L888.437 593.495L888.714 594.609L888.281 595.843L889.536 596.849L889.052 597.609L890.406 598.375L890.089 599.974L889.74 600.25L888 599.286L886.703 600.187L886.276 601.354L878.766 593.698L878.375 591.703L877.005 591.052L876.875 589.474L877.245 590.078L878.427 589.89L877.135 589.682L877.37 588.323L876.599 588.89L875.865 588.359L874.234 584.755L875.703 586.234L877.198 583.239L877.182 580.422L878.078 581.416L878.859 581.151L879.651 581.791L880.021 581.088L880.729 580.984L878.167 580.453L877.229 579.307L878.458 578.838L878.651 579.578L878.469 577.135L879.667 576.932H887.271V571.161L887.625 570.489L888.724 570.442Z"
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
