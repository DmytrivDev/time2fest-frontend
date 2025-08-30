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
      id="EquatorialGuinea"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GQ"
      data-label={`${t('countries.EquatorialGuinea')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M879.702 570.294L881.374 571.164H887.27V576.935H879.666L879.124 576.346L878.583 576.747L877.442 576.107L878.801 574.06L879.312 574.023L878.713 573.784L879.687 572.409L879.702 570.294Z"
          fill="#5DBD39"
        />
        <path
          d="M873.822 563.908L875.499 563.605L874.109 566.064L872.843 565.356L873.822 563.908Z"
          fill="#5DBD39"
        />
        <path
          d="M861.342 588.908C861.342 590.236 860.269 591.309 858.947 591.309C857.618 591.309 856.545 590.236 856.545 588.908C856.545 587.585 857.618 586.512 858.947 586.512C860.269 586.512 861.342 587.585 861.342 588.908Z"
          fill="#5DBD39"
        />
      </g>
      <path
        d="M876.5 563.5L879 570L881.5 571.155H887.271V577H880L879 576.5L878.5 577L877.5 576H875V584H873.5V588L868 592H855.5V586H871V570H868.5V562.5H874.5L876.5 563.5Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.500002"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
