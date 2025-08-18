import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, onClick }) {
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
      data-country="LY"
      data-label={`${t('countries.libya')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Libiya"
      d="M888.196 411.494L893.31 413.541L900.091 413.728L902.612 415.015L906.216 415.759L908.414 420.686L910.909 422.02L914.029 422.207L919.492 423.827L925.206 427.405L928.19 426.608L930.31 424.4L930.873 422.395L929.748 419.473L930.144 417.9L932.951 414.863L936.93 413.666L940.055 412.91L944.987 414.244L945.545 414.468L945.399 416.046L946.211 416.759L954.68 418.098L955.639 419.879L954.222 421.436L954.743 425.457L953.441 428.035L954.654 432.395L954.889 471.239V481.583L949.941 481.911V484.15L910.342 463.681L905.378 466.03L901.748 467.967L898.18 465.155L890.472 463.306L887.915 459.087L884.175 457.847L882.795 458.29L882.003 457.717L881.06 456.483L880.201 452.978L877.743 449.571L878.774 448.097L879.873 447.603L879.336 443.342L880.383 440.561L879.737 438.176L879.81 433.238L877.305 428.327L878.347 427.582L880.112 426.91L881.743 424.78L882.107 419.577L885.164 417.113L888.144 415.696L888.196 411.494Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
