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
      id="Gana"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GH"
      data-label={`${t('countries.Gana')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M830.396 526.534L831.281 526.81L830.734 528.722L833.052 530.696L832.411 534.014L832.969 534.342L832.265 535.045L832.854 534.863L833.667 538.014L833.031 538.42L834.693 540.519L834.083 541.316L833.682 544.774L834.37 545.352L833.708 547.295L834.724 549.498L837.073 551.659L835.927 553.17L834.578 553.284L833.677 551.899L832.172 551.711L834.302 552.925L829.37 554.68L826.859 556.164L823.375 557.029L821.364 558.388L815.781 556.701V556.581L816.646 556.628L817.62 556.467L817.557 554.847L816.099 553.04L815.161 548.316L817.005 543.498L818.797 541.055L818.344 538.321L817.442 536.987L817.844 534.821L816.646 528.69L817.109 527.222L828.734 527.201L830.396 526.534Z"
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
