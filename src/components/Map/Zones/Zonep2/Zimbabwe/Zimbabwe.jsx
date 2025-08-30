import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = (e) => {
    e.stopPropagation(); // не віддаємо подію зоні
    const zoneId = e.currentTarget.getAttribute('data-id'); // "UTC+2"
    const code = (e.currentTarget.getAttribute('data-country') || '').toUpperCase(); // "CY"
    onClick?.(zoneId, code);
  };

  return (
    <path
      className="country"
      data-tt="2"
      data-id="UTC+2"
      data-country="ZW"
      data-label={`${t('countries.zimbabwe')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Zimbabwe"
      d="M974.409 661.575L977.566 660.033L981.701 659.893L982.081 661.757L984.8 661.939L993.342 665.408L994.389 665.419L994.8 673.674L993.045 676.19L993.915 677.554L993.743 680.497L994.342 680.408L994.738 681.044L994.534 682.195L992.878 684.992L992.05 685.461L991.357 688.007L991.962 689.143L991.602 688.95L986.071 694.7L984.212 694.07L976.54 693.544L974.863 692.086L974.993 691.492L969.805 690.268L968.248 686.861L968.378 684.929L966.217 684.752L965.93 682.737L960.706 679.804L959.779 677.065L956.201 670.929L963.321 672.33L965.014 671.695L968.675 667.101L973.529 664.513L974.409 661.575Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
