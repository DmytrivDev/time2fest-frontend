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
      id="Folckends"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="FK"
      data-label={`${t('countries.falkland-islands')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M535.541 866.162L538.047 863.547L538.818 863.381L539.193 864.037L538.599 862.37L539.041 862.615L539.161 862.152L538.682 861.558L539.765 861.245L539.442 860.521L542.068 861.006L542.37 861.704L541.526 861.495L541.484 862.016L543.005 863.084L542.901 861.459L544.453 861.308L545.161 862.178L543.359 862.48L545.312 863.433L542.088 864.751L540.25 864.709L539.344 864.162L541.052 865.459L540.87 866.209L540.172 865.667L539.495 866.089L537.823 865.391L538.88 866.719L536.916 866.35L537.422 867.688L535.541 866.162Z"
          fill="#5DBD39"
        />
        <path
          d="M529.235 865.202L528.511 864.343L529.943 863.957L529.776 864.989L529.235 865.202Z"
          fill="#5DBD39"
        />
        <path
          d="M531.101 867.055L529.138 865.503L531.57 865.17L532.132 864.826L531.257 864.941L532.028 863.956L533.231 863.498L531.57 864.008L531.096 863.253L533.752 863.347L531.768 862.159L532.226 861.972L531.08 861.165L533.054 862.04L534.091 861.352L535.492 861.79L537.148 861.066L538.023 861.555L534.784 865.123L532.836 865.399L532.596 866.284L531.482 866.185L531.674 866.732L531.101 867.055Z"
          fill="#5DBD39"
        />
      </g>
      <path
        d="M548 857.5H527C526.831 857.5 526.694 857.637 526.694 857.806V868.707C526.694 869.26 527.142 869.707 527.694 869.707H548C548.552 869.707 549 869.26 549 868.707V858.5C549 857.948 548.552 857.5 548 857.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
