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
      id="FranchGuiana"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GF"
      data-label={`${t('countries.FranchGuiana')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M563.795 554.081L564.503 553.378L569.857 555.534L572.305 557.888L572.05 558.362L572.925 558.097L573.993 559.815L574.352 559.003L575.081 559.862L575.315 561.915L572.039 566.524L570.831 569.602L569.133 571.071L567.493 571.04L567.274 570.347L563.352 571.42L560.862 570.363L562.878 568.076L563.899 564.003L561.518 558.675L561.623 557.029L563.024 555.399L563.795 554.081Z"
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
