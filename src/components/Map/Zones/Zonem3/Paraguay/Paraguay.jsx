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
      id="Paraguay"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PY"
      data-label={`${t('countries.Paraguay')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M538.754 678.534L543.296 681.321L543.26 683.076L544.963 687.289L544.135 693.013L549.817 694.097L551.994 692.92L552.609 693.722L554.999 694.43L555.885 695.909L556.317 700.477L557.145 702.935L559.572 702.524L562.645 703.258L560.88 711.258L559.989 716.633L554.812 721.034L554.114 720.602L552.161 721.941L550.791 721.243L547.666 721.185L545.463 720.503L541.057 720.519L540.807 719.701L542.301 718.217L543.234 715.242L546.109 711.295L545.671 709.795L539.234 706.482L534.108 703.133L529.265 702.05L524.874 698.201L522.562 694.993L521.062 693.789L522.957 687.368L523.265 684.638L525.707 680.352L534.03 678.638L538.754 678.534Z"
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
