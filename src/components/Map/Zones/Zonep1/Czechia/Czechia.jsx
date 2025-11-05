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
      id="Czechia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CZ"
      data-label={`${t('countries.czechia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M901.929 304.613L904.539 305.822L905.487 304.796L906.2 304.822L907.237 306.363L912.013 307.145L912.179 308.197L911.351 308.692L913.336 310.619L915.445 310.009L914.846 308.593L918.82 309.363L918.815 310.228L918.283 310.478L919.45 311.514L920.502 311.082L923.106 312.639L924.45 314.551L921.497 315.978L920.627 317.587L919.492 318.327L917.309 318.994L916.263 318.702L915.028 320.28L913.528 319.207L911.492 319.504L905.518 317.754L905.252 319.285L903.872 320.525L901.471 320.457L899.616 319.311L893.695 314.832L892.523 313.035L893.221 311.962L891.846 311.108L891.002 309.358L892.085 310.348L893.387 308.869L895.262 308.775L898.153 306.947L902.127 305.681L901.929 304.613Z"
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
