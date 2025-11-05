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
      id="Netherlands"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="NL"
      data-label={`${t('countries.netherlands')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M850.329 300.054L851.204 300.809L849.391 300.408L850.329 300.054Z"
        fill="#5DBD39"
      />
      <path
        d="M851.102 299.84L850.337 299.533L852.248 300.142L851.774 300.413L851.102 299.84Z"
        fill="#5DBD39"
      />
      <path
        d="M856.116 292.2L857.256 293.763L856.037 294.211L855.985 296.039L858.282 296.638L859.954 295.492L860.126 294.32L858.86 293.935L859.449 292.789L858.1 292.7L857.938 291.627L856.834 291.768L856.116 292.2ZM863.563 288.778L865.209 288.992L866.824 290.075L866.079 293.893L864.402 294.2L864.345 295.143L866.136 295.924L866.058 296.789L864.256 298.112L864.944 298.591L863.157 299.33L861.621 298.987L860.569 299.591L861.876 301.638L861.886 302.638L861.199 303.549L861.678 303.919L860.204 304.778L861.215 305.56L860.902 306.528L859.319 306.508L860.001 303.851L858.444 303.023L857.074 303.226L856.283 301.865L854.75 301.66L853.479 302.058L852.194 302.481L848.616 301.914L848.287 301.32L849.949 300.976L852.251 302.034L850.918 301.07L853.043 300.571L855.048 300.268L854.829 299.716L853.616 300.315L852.871 300.122L851.126 298.836L853.392 296.195L854.496 292.471L856.793 291.679L859.491 289.466L863.563 288.778Z"
        fill="#5DBD39"
      />
      <path
        d="M858.769 294.454L859.732 294.547L859.962 295.355L857.534 296.318L856.597 296.016L858.769 294.454Z"
        fill="#5DBD39"
      />
      <path
        d="M847.849 302.48L852.12 302.647L850.234 303.553L848.75 303.017L848.052 303.262L847.823 302.491L847.849 302.48Z"
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
