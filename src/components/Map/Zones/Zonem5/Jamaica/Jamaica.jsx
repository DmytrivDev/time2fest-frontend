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
      id="Jamaica"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="JM"
      data-label={`${t('countries.jamaica')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M446.354 489.254L449.651 489.749L451.557 490.551L453.583 491.801L454.016 492.358L453.266 492.572L450.922 491.983L449.334 492.447L449.287 493.337L448.052 492.593L447.188 492.546L443.38 490.316L446.354 489.254Z"
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
