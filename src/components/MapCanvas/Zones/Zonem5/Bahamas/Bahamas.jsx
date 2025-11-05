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
      id="Bahamas"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BS"
      data-label={`${t('countries.bahamas')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M457.621 460.174L457.866 459.372L456.236 457.195L458.309 459.627L457.621 460.174Z"
          fill="#FA7850"
        />
        <path
          d="M448.928 450.921L448.042 450.145L449.23 447.332L447.36 445.707L445.329 445.504L447.303 445.525L449.782 447.561L449.964 448.644L449.194 449.014L448.928 450.921Z"
          fill="#FA7850"
        />
        <path
          d="M444.034 454.494L445.149 454.822L446.342 457.15L446.409 458.327L444.883 459.385L442.894 457.603L443.394 457.166L444.087 457.671L443.545 457.02L444.253 455.546L444.034 454.494Z"
          fill="#FA7850"
        />
        <path
          d="M447.328 462.027L446.208 462.173L445.432 460.371L446.437 459.366L446.291 460.1L447.067 459.71L447.328 462.027Z"
          fill="#FA7850"
        />
        <path
          d="M441.554 447.681L440.216 446.587L441.086 447.207L442.185 446.014L443.028 446.524L445.492 446.269L445.466 446.894L441.554 447.681Z"
          fill="#FA7850"
        />
        <path
          d="M453.448 454.281L454.396 454.973L454.089 457.426L453.375 456.541L454.057 456.374L454.229 455.124L453.448 454.281Z"
          fill="#FA7850"
        />
        <path
          d="M466.661 476.747L466.437 475.904L467.864 475.242L468.838 475.612L469.677 474.706L469.031 476.544L466.661 476.747Z"
          fill="#FA7850"
        />
        <path
          d="M463.661 470.054L465.458 468.575L464.625 468.018L465.536 467.419L465.625 468.518L463.661 470.054Z"
          fill="#FA7850"
        />
        <path
          d="M469.594 469.454L468.969 469.334L469.147 468.944L471.147 469.522L469.594 469.454Z"
          fill="#FA7850"
        />
        <path
          d="M459.315 464.401L460.309 466.078L458.82 465.166L459.315 464.401Z"
          fill="#FA7850"
        />
      </g>
      <path
        d="M472.5 443V479H465L439 460V443H472.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
