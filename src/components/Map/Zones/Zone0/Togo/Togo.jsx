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
      id="Togo"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="TG"
      data-label={`${t('countries.Togo')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M830.396 526.534L835.682 527.248L835.114 530.201L837.843 532.258L837.89 534.826L839.156 537.034L839.005 548.717L840.01 550.675L839.234 551.076L837.073 551.659L834.724 549.498L833.708 547.295L834.37 545.352L833.682 544.774L834.083 541.316L834.692 540.519L833.031 538.42L833.666 538.014L832.854 534.862L832.265 535.045L832.969 534.342L832.411 534.013L833.052 530.696L830.734 528.722L831.281 526.81L830.396 526.534Z"
        fill="#F0F032"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
