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
    onClick?.(zoneId, code);
  };

  return (
    <g
      id="ChristmassIsland"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CX"
      data-label={`${t('countries.christmass_island')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1356.57 633.894C1356.57 635.217 1355.5 636.295 1354.17 636.295C1352.85 636.295 1351.77 635.217 1351.77 633.894C1351.77 632.571 1352.85 631.493 1354.17 631.493C1355.5 631.493 1356.57 632.571 1356.57 633.894Z"
        fill="#FA7850"
      />
      <path
        className="noBg"
        id="Over_20"
        d="M1362.5 627H1347V641.5H1362.5V627Z"
        stroke="#272727"
        strokeWidth="0.5"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
