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
      id="EasterIsland"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CL"
      data-label={`${t('countries.EasterIsland')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M292.194 719.441C292.194 720.769 291.121 721.842 289.793 721.842C288.47 721.842 287.397 720.769 287.397 719.441C287.397 718.118 288.47 717.04 289.793 717.04C291.121 717.04 292.194 718.118 292.194 719.441Z"
          fill="#FA7850"
        />
        <path
          d="M311.514 715.908C311.514 717.236 310.436 718.309 309.113 718.309C307.785 718.309 306.712 717.236 306.712 715.908C306.712 714.585 307.785 713.512 309.113 713.512C310.436 713.512 311.514 714.585 311.514 715.908Z"
          fill="#FA7850"
        />
        <path
          d="M289.567 719.854L289.677 719.151L290.458 719.365L289.567 719.854Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M282 729.5V708.5H311.5V729.5H282Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
