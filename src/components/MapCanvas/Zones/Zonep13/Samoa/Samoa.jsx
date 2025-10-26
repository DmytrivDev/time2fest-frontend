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
      id="Samoa"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="WS"
      data-label={`${t('countries.samoa')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M1763.51 650.708C1763.51 652.031 1762.44 653.109 1761.11 653.109C1759.79 653.109 1758.71 652.031 1758.71 650.708C1758.71 649.38 1759.79 648.307 1761.11 648.307C1762.44 648.307 1763.51 649.38 1763.51 650.708Z"
          fill="#E3C57F"
        />
        <path
          d="M1765.37 651.215C1765.37 652.537 1764.31 653.616 1762.97 653.616C1761.65 653.616 1760.57 652.537 1760.57 651.215C1760.57 649.892 1761.65 648.813 1762.97 648.813C1764.31 648.813 1765.37 649.892 1765.37 651.215Z"
          fill="#E3C57F"
        />
        <path
          d="M1762.04 649.535C1762.04 650.863 1760.96 651.936 1759.64 651.936C1758.32 651.936 1757.24 650.863 1757.24 649.535C1757.24 648.212 1758.32 647.139 1759.64 647.139C1760.96 647.139 1762.04 648.212 1762.04 649.535Z"
          fill="#E3C57F"
        />
        <path
          d="M1759.77 648.815L1760.55 649.299L1760.65 650.591L1758.61 650.023L1757.82 649.101L1759.77 648.815Z"
          fill="#E3C78A"
        />
        <path
          d="M1762.44 650.588L1764.43 651.801L1762.04 651.593L1761.48 651.114L1762.44 650.588Z"
          fill="#E3C78A"
        />
      </g>
      <path
        d="M1740 633L1748.5 643.5V656L1758.5 657V657.5H1765H1765.5V633H1740Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
