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
      id="Morocco"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MA"
      data-label={`${t('countries.morocco')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M804.436 396.16L804.681 396.587L805.951 398.801L808.774 400.306L812.227 400.197L816.404 398.921L816.931 400.535L816.847 400.004L820.207 400.837L822.457 402.692L821.967 403.442L822.769 404.181L822.582 408.561L824.707 414.103L825.957 415.035L824.915 416.697L825.28 417.369L819.602 417.093L817.082 417.468L815.889 419.03L813.759 419.744L812.29 419.598L812.123 420.801L812.691 421.228L812.207 422.53L813.306 422.91L813.233 423.556L806.295 426.843L803.78 429.363L799.092 429.77L798.509 431.207L797.623 431.025L793.259 432.223L788.243 435.822V441.415H765.926L767.004 440.014L772.832 438.525L779.494 433.66L783.327 428.285L783.582 426.806L782.27 425.468L782.426 421.296L784.457 418.139L785.207 414.952L788.843 411.082L795.926 407.832L797.863 405.879L801.822 396.889L804.436 396.16Z"
        fill="#5DBD39"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
