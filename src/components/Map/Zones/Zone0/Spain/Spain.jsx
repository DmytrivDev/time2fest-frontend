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
      id="Spain"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="ES"
      data-label={`${t('countries.Spain')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M745.849 439.574L745.359 439.136L745.661 438.553L746.521 438.98L745.849 439.574Z"
          fill="#F0F032"
        />
        <path
          d="M742.129 441.56L741.207 440.998L742.436 440.43L742.129 441.56Z"
          fill="#F0F032"
        />
        <path
          d="M762.969 435.134L762.912 433.957L764.636 433.056L764.406 434.274L762.969 435.134Z"
          fill="#F0F032"
        />
        <path
          d="M754.022 441.067L753.007 440.494L752.845 439.63L753.408 438.791L754.809 438.703L755.048 440.307L754.022 441.067Z"
          fill="#F0F032"
        />
        <path
          d="M760.196 439.387L759.352 439.293L760.789 438.424L761.82 435.814L762.43 435.58L762.732 436.491L762.263 438.215L760.196 439.387Z"
          fill="#F0F032"
        />
        <path
          d="M743.116 436.787L742.032 435.61L742.449 435.11L743.412 435.589L743.116 436.787Z"
          fill="#F0F032"
        />
        <path
          d="M748.622 439.707L747.435 437.796L751.273 436.499L748.622 439.707Z"
          fill="#F0F032"
        />
      </g>
      <path
        d="M764 445.5H739.5V430.5H767V440L766 441L764 445.5Z"
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
