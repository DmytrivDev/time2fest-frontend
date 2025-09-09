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
      id="SanTomeAndPricpi"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="ST"
      data-label={`${t('countries.SanTomeAndPricpi')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M869.943 573.881C869.943 575.203 868.87 576.282 867.547 576.282C866.219 576.282 865.146 575.203 865.146 573.881C865.146 572.552 866.219 571.479 867.547 571.479C868.87 571.479 869.943 572.552 869.943 573.881Z"
          fill="#F0F032"
        />
        <path
          d="M866.289 580.614C866.289 581.942 865.211 583.015 863.888 583.015C862.56 583.015 861.487 581.942 861.487 580.614C861.487 579.291 862.56 578.213 863.888 578.213C865.211 578.213 866.289 579.291 866.289 580.614Z"
          fill="#F0F032"
        />
        <path
          d="M863.436 581.801L863.202 580.525L864.28 579.931L864.566 580.754L863.436 581.801Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M855.5 570H870.815V586.248H855.581L855.5 570Z"
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
