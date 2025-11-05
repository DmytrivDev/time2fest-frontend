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
      id="Angola"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="AO"
      data-label={`${t('countries.angola')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M894.395 603.641L895.937 604.849L892.823 606.932L893.073 610.266L891.599 610.484L891.354 608.057L890.666 606.745L894.395 603.641Z"
        fill="#5DBD39"
      />
      <path
        d="M896.382 610.921L913.21 611.155L915.762 618.488L917.945 621.983L920.82 622.113L922.856 621.259L927.043 621.582L927.986 616.879L933.194 616.181L932.804 617.957L938.903 618.004L938.819 621.457L939.59 623.238L939.012 628.592L939.293 629.592L940.819 631.171L941.569 634.624L940.877 635.827L941.252 637.733L942.418 637.233L949.2 636.702L949.871 635.915L950.2 643.514L949.382 645.613L949.924 646.603L940.033 646.691L940.044 662.634L940.731 664.264L947.351 670.04L938.83 671.681L935.023 671.769L924.866 671.019L922.101 668.842L900.341 669.014L897.205 666.696L895.622 666.874L893.143 668.098L889.32 668.144L889.236 661.077L890.669 659.363L893.314 648.54L895.424 645.551L897.788 644.103L899.418 640.316L899.398 635.879L895.445 627.04L897.028 625.374L897.304 623.186L894.7 616.957L891.778 612.17L896.382 610.921Z"
        fill="#5DBD39"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
