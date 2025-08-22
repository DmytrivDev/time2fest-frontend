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
      id="Uganda"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="UG"
      data-label={`${t('countries.Uganda')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M999.423 560.974L1000.34 563.198L1001.74 563.771L1002.19 566.469L1004.07 569.479L1004.39 572.234L1003.45 575.823L1002.04 576.375L999.444 580.75L998.486 581.104L997.944 580.26L997.048 581.005L996.392 579.672L995.897 579.62L994.756 581.177L993.772 581.51L992.845 581.38L992.767 580.453L992.366 581.62L990.553 581.745L989.256 582.515L989.704 583.411L988.23 585.505L988.475 586.844L982.027 587.151L979.636 589.042L979.209 589.161L978.855 588.427L977.642 588.75L978.199 582.26L979.574 577.698L985.251 572.479L986.043 571.161L983.313 569.77L983.892 564.593L985.23 563.234L987.267 563.797L988.569 562.958L989.298 564.093L990.412 564.489L991.61 563.349L994.34 562.729L997.048 563.307L999.423 560.974Z"
        fill="#FA7850"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
