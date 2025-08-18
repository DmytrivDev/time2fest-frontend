import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = (e) => {
    e.stopPropagation();              // не віддаємо подію зоні
    const zoneId = e.currentTarget.getAttribute('data-id');          // "UTC+2"
    const code   = (e.currentTarget.getAttribute('data-country') || '').toUpperCase(); // "CY"
    onClick?.(zoneId, code);
  };

  return (
    <path
      className="country"
      data-tt="2"
      data-id="UTC+2"
      data-country="ZM"
      data-label={`${t('countries.zambia')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Zambia"
      d="M982.463 622.681L981.864 623.879L982.328 624.509L982.823 624.05L984.77 625.576L985.51 625.29L985.421 624.545L986.401 624.524L990.01 626.853L994.192 628.587L995.776 629.957L996.099 631.78L997.963 634.363L995.833 635.972L995.838 642.134L997.104 643.472L995.416 644.623L994.849 644.519L994.088 648.363L992.916 649.597L994.552 651.837L995.588 651.702L980.692 656.592L981.697 659.894L977.562 660.035L974.406 661.577L973.525 664.514L968.671 667.103L965.01 671.696L963.317 672.332L956.197 670.931L954.739 669.696L951.728 669.353L947.348 670.035L940.728 664.259L940.041 662.629L940.03 646.686L949.921 646.598L949.379 645.608L950.197 643.509L949.869 635.91L951.848 637.254L951.968 637.962L951.442 638.493L952.124 638.848L956.473 637.53L956.484 639.29L957.38 640.431L964.182 641.426L964.937 639.572L965.713 639.431L967.76 642.743L971.515 643.827L975.015 648.551L975.687 648.79L977.572 647.712L978.078 647.962L977.864 648.738L978.729 648.874L978.671 642.353L977.072 642.775L976.864 643.796L974.849 643.493L973.411 641.488L972.208 640.921L971.536 639.316L972.875 634.16L972.562 632.639L973.088 630.488L972.312 628.353L971.578 627.894L974.395 625.108L974.198 623.983L982.463 622.681Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
