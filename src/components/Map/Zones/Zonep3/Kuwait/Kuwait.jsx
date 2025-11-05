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
      id="Kuwait"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="KW"
      data-label={`${t('countries.kuwait')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1061.6 433.707L1064.64 428.764L1066.25 428.301L1068.46 428.796L1069.57 431.212L1068.62 430.863L1067.6 432.207L1068.82 432.353L1070.8 436.707L1067.19 436.681L1066.37 434.889L1061.58 433.717L1061.6 433.707Z"
        fill="#FA7850"
      />
      <path
        d="M1069.77 431.054L1068.99 429.949L1069.55 428.908L1070.51 430.241L1069.77 431.054Z"
        fill="#FA7850"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
