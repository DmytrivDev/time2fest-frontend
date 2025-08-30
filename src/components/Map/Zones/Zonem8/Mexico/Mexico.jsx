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
      id="Mexico"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MX"
      data-label={`${t('countries.Mexico')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M271.114 434.162L269.249 432.578L268.937 431.094L269.817 431.682L269.921 432.531L270.884 432.682L271.114 434.162Z"
        fill="#F0F032"
      />
      <path
        d="M263.274 414.045L257.164 414.498L251.404 415.008L255.33 423.508L256.658 424.482L256.764 426.398L257.68 426.82L258.055 429.348L260.065 431.279L262.158 432.223L266.414 436.742L265.904 439.602L273.023 439.629L272.602 438.098V437.311L271.33 436.894L266.305 430.68L264.17 428.852L262.752 423.436L262.986 419.961L261.826 416.311L263.274 414.045Z"
        fill="#F0F032"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
