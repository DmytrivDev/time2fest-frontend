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
      id="Poland"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PL"
      data-label={`${t('countries.Poland')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M918.689 279.574L921.924 279.256L924.319 280.647L922.377 279.61L923.106 281.969L924.965 282.568L928.299 281.808L928.413 281.855L926.325 282.725L926.434 283.058L927.08 283.386L929.137 281.98L937.913 282.725L943.929 282.485L944.861 282.313L946.668 283.298L947.486 285.318L949.471 290.548L949.637 293.214L945.809 296.495L948.122 297.824L947.637 300.657L947.986 301.485L949.606 304.985L950.616 305.844L949.731 306.162L950.476 307.36L949.955 308.761L947.668 309.876L943.439 314.173L943.512 316.761L944.413 317.834L942.804 317.365L937.075 315.126L935.023 315.865L932.252 315.381L929.497 316.605L928.986 316.511L929.059 315.256L928.122 314.97L927.773 314.194L925.84 315.313L924.455 314.553L923.111 312.641L920.507 311.084L919.455 311.516L918.288 310.48L918.819 310.23L918.825 309.365L914.851 308.594L915.45 310.011L913.34 310.621L911.356 308.693L912.184 308.199L912.017 307.147L907.241 306.365L906.205 304.824L905.491 304.798L904.543 305.824L905.559 303.053L904.064 301.407L903.408 299.558L903.991 298.334L903.872 296.683L903.096 295.782L903.601 294.553L901.247 292.391L902.247 291.194L902.491 289.428L901.804 287.001L903.387 287.714L903.554 286.006L901.528 285.85L901.559 285.444L911.403 283.095L912.762 281.428L918.689 279.574Z"
        fill="#5DBD39"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
