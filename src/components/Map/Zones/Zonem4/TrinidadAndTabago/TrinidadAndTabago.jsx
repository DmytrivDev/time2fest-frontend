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
      id="TrinidadAndTabago"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TT"
      data-label={`${t('countries.trinidad-and-tobago')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M528.368 528.227L529.603 528.149L529.04 529.17L528.952 531.607L524.634 531.899L526.952 530.696L526.743 529.055L525.962 528.68L528.368 528.227Z"
          fill="#F0F032"
        />
        <path
          d="M530.941 526.28L529.999 526.41L531.566 525.577L530.941 526.28Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M533 532.5C533 532.5 528.015 532.5 524.5 532.5V530L526 527.5V523.582H533V532.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
