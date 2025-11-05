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
      id="ElSalvador"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SV"
      data-label={`${t('countries.el-salvador')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M388.661 509.881L388.853 510.042L390.156 510.173L392.171 512.11L393.103 512.308L393.135 512.834L395.072 512.173L396.687 512.803L397.015 513.141L396.447 515.152L396.02 516.433L391.525 515.928L385.176 513.438L385.629 512.423L388.041 510.995L387.728 510.266L388.661 509.881Z"
        fill="#14D2DC"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
