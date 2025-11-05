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
      id="Kashmir"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="IN"
      data-label={`${t('countries.kashmir')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1220.9 396.135L1223.73 395.775L1227.4 398.963L1228.49 398.343L1229.05 398.739L1228.12 401.307L1225.68 404.572L1224.92 404.484L1224.9 405.822L1223.61 406.744L1221.77 407.015L1220.86 406.583L1222.11 404.942L1218.85 403.426L1217.36 399.765L1217.43 398.506L1217.74 397.768L1220.9 396.135Z"
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
