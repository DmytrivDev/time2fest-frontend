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
      id="Congo"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CG"
      data-label={`${t('countries.Congo')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M917.343 563.667L922.572 563.865L923.322 564.662L923.275 566.36L920.692 570.938L919.614 576.948L919.999 580.12L918.051 585.673L914.66 588.037L912.952 591.11L911.275 592.771L911.442 598.423L909.791 601.417L906.124 603.803L903.733 606.204L902.509 606.1L902.442 603.068L899.968 604.131L899.082 603.964L898.353 605.563L897.504 606.048L895.936 604.839L894.395 603.631L890.666 606.735L889.436 604.412L886.275 601.35L886.702 600.183L887.999 599.282L889.738 600.245L890.087 599.969L890.405 598.37L889.051 597.605L889.535 596.844L888.28 595.839L888.712 594.605L888.436 593.49L890.968 593.803L892.285 593.157L892.78 591.188L894.212 591.214L895.494 593.615L898.52 593.396L899.228 592.271L899.775 594.068L900.983 594.235L902.733 590.256L902.551 586.558L902.994 584.99L899.931 583.058L900.994 579.714L902.134 578.829L902.566 577.344L901.603 575.141L899.441 574.818L896.41 575.839L896.405 572.62L896.941 571.183L903.363 571.053L904.874 572.001L908.868 572.334L910.665 573.678L910.806 571.209L911.358 570.896L912.52 568.422L913.223 564.693L917.343 563.667Z"
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
