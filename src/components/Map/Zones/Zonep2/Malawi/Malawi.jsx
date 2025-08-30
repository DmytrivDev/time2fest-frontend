import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
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
      data-country="MW"
      data-label={`${t('countries.malawi')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Malawi"
      d="M994.196 628.588L999.045 630.093L1000.74 633.718L1000.35 634.479L1001.02 640.052L999.581 642.598L1001.09 646.348L1001.07 648.635L1002.54 650.265L1002.16 652.005L1003.14 652.958L1003.77 651.645L1005.8 653.296L1004.74 650.343L1004.06 650.078L1003.73 649.151L1008.71 654.927L1008.28 662.078L1005.9 662.849L1005.07 664.567L1005.83 667.526L1004.82 667.364L1004.39 665.807L1001.55 662.984L1000.7 661.198L1002.42 656.693L1001.39 653.677L997.639 654.427L995.592 651.703L994.555 651.838L992.92 649.599L994.092 648.364L994.852 644.521L995.42 644.625L997.107 643.474L995.842 642.135L995.836 635.974L997.967 634.364L996.102 631.781L995.779 629.958L994.196 628.588Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
