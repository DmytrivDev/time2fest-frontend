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
      id="Liberia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="LR"
      data-label={`${t('countries.Liberia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M782.236 539.721L782.84 539.388L784.158 540.461L784.845 543.497L784.194 545.393L785.512 545.273L786.053 546.232L787.288 545.867L788.668 543.747L789.22 544.403L790.163 547.19L789.798 548.445L788.543 549.643L790.283 550.596L791.975 550.794L794.382 553.07L794.481 555.841L793.59 558.07L793.897 560.341L788.033 558.039L784.481 555.747L779.835 551.408L778.491 551.08L774.262 547.554L778.465 543.513L778.944 541.752L780.178 541.2L780.33 539.784L782.236 539.721Z"
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
