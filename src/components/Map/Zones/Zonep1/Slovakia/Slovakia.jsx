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
      id="Slovakia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SK"
      data-label={`${t('countries.Slovakia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M927.769 314.187L928.118 314.963L929.055 315.249L928.983 316.504L932.248 315.374L935.019 315.858L937.071 315.119L942.8 317.358L940.826 320.739L940.79 321.609L938.759 322.004L937.665 320.796L934.082 320.582L932.462 321.291L930.436 323.098L927.873 322.864L925.019 323.838L924.056 324.556L924.446 325.364L922.78 325.744L919.17 325.812L916.951 324.228L916.087 323.728L916.53 324.056L916.113 324.135L914.509 321.905L915.03 320.275L916.264 318.697L917.311 318.989L919.493 318.322L920.629 317.582L921.498 315.973L924.451 314.546L925.837 315.306L927.769 314.187Z"
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
