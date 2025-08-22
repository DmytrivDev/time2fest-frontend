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
      id="Djibuti"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="DJ"
      data-label={`${t('countries.Djibuti')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1044.58 518.654L1045.59 519.79L1045.99 522.019L1041.67 524.488L1043.5 524.316L1045.21 524.878L1043.7 527.217L1042.04 526.769L1038.79 527.561L1037.99 527.305L1038.16 523.613L1041.02 519.847L1042.49 520.389L1044.58 518.654Z"
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
