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
      id="Syria"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SY"
      data-label={`${t('countries.Syria')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1040.58 388.547L1040.8 389.406L1038.02 392.339L1036.08 392.714L1035.46 394.307L1035.68 398.219L1035.21 402.453L1034.16 404.432L1023.17 410.354L1013.5 416.203L1009.74 415.109L1008.17 413.833L1007.72 414.141L1007.32 414.182L1007.39 413.502L1007.43 413.026L1007.6 411.943L1007.47 411.083L1009.6 409.266L1009.19 408.662L1009.69 407.859L1011.06 407.854L1010.98 407.083L1012.43 405.755L1011.75 404.344L1011.07 404.104L1011.61 403.354L1009.2 403.286L1008.94 398.974L1008 398.057L1008.95 396.099L1010.11 396.713L1011.23 395.448L1011.22 394.62L1012.6 393.927L1012.07 392.995L1012.6 390.958L1014.55 392.094L1016.41 392.062L1020.13 390.552L1022.34 391.333L1026.35 391.734L1032.87 389.385L1037.26 389.391L1040.58 388.547"
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
