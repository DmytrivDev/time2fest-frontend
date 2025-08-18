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
      data-country="NA"
      data-label={`${t('countries.namibia')} UTC+2`}
      onPointerUp={handlePointerUp}
      data-time={ny.display}
      id="Namibia"
      d="M897.196 666.694L900.331 669.012L922.091 668.84L924.857 671.017L935.013 671.767L938.821 671.679L947.342 670.038L951.722 669.356L954.732 669.7L956.191 670.934L951.79 671.679L948.008 674.429L946.441 671.944L935.05 673.574L935.081 692.205L930.133 692.549V706.997L930.112 726.424L927.967 727.023L926.487 728.148L926.227 729.09L921.102 729.044L917.274 727.971L916.883 726.674L917.222 725.955L916.133 724.71L914.815 724.564L912.758 727.262L912.086 727.184L909.128 724.346L906.841 720.543L904.581 712.252L904.555 708.236L902.794 703.84L903.034 696.116L892.352 676.236L889.591 672.408L889.31 668.142L893.133 668.095L895.612 666.871L897.196 666.694Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
