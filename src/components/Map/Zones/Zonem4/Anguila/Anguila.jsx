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
      id="Anguila"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AI"
      data-label={`${t('countries.anguilla')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M519.194 491.307L518.58 491.322C518.45 491.328 518.34 491.437 518.345 491.572C518.351 491.703 518.46 491.807 518.595 491.802L519.21 491.786C519.34 491.781 519.444 491.671 519.439 491.541C519.439 491.406 519.33 491.302 519.194 491.307Z"
        fill="#F0F032"
      />
      <path
        d="M523 494H515V488H523V494Z"
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
