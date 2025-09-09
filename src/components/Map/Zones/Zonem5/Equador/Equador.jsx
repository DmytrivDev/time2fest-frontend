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
      id="Equador"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="EC"
      data-label={`${t('countries.Equador')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M435.154 595.094L435.477 595.474L434.816 596.479L433.8 596.802L434.139 595.385L435.154 595.094Z"
        fill="#FA7850"
      />
      <path
        d="M441.035 574.787L443.93 576.881L446.665 577.777L448.123 579.985L451.884 580.6L454.092 580.006L458.488 582.49L456.795 582.542L457.54 583.074L458.764 586.454L457.029 589.563L451.681 594.631L445.988 596.589L444.451 598.261L444.274 599.131L443.248 599.376L441.858 604.027L439.795 606.673L438.102 605.834L436.884 603.86L434.493 603.11L432.769 603.777L432.67 601.98L434.404 601.11L433.467 598.636L435.149 597.943L436.503 594.568L435.925 593.157L435.628 594.506L434.925 594.73L435.149 593.558L433.717 595.402L430.55 593.245L430.175 592.735L431.358 592.292L431.3 588.318L430.628 587.053L433.795 585.016L432.67 583.777L434.587 581.896L435.149 580.183L434.826 577.834L437.014 577.678L436.946 577.058L440.149 576.344L441.035 574.787Z"
        fill="#FA7850"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
