import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = (e) => {
    e.stopPropagation();              // не віддаємо подію зоні
    const zoneId = e.currentTarget.getAttribute('data-id');          // "UTC+2"
    const code   = (e.currentTarget.getAttribute('data-country') || '').toUpperCase(); // "CY"
    onClick?.(zoneId, code);
  };

  return (
    <path
      className="country"
      data-tt="2"
      data-id="UTC+2"
      data-country="RW"
      data-label={`${t('countries.rwanda')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Rwanda"
      d="M982.009 587.147L982.02 587.158L983.713 590.038L984.056 592.179L983.843 593.33L982.473 593.768L980.233 593.825L979.395 593.33L979.244 595.033L976.806 595.773L975.145 594.736L974.801 595.486L974.108 594.164L975.4 592.721L975.838 590.283L977.635 588.757L978.848 588.434L979.202 589.169L979.629 589.049L982.009 587.147Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
