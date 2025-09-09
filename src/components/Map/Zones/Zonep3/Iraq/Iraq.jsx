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
      id="Iraq"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="IQ"
      data-label={`${t('countries.Iraq')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1044.6 387.88L1049.86 388.364L1050.58 390.057L1052.83 389.177L1053.38 390.359L1053.2 391.229L1053.97 391.448L1053.98 392.687L1055.01 393.245L1055.74 395.792L1056.46 395.63L1057.68 396.755L1060.55 396.849L1059.01 397.437L1058.91 398.781L1059.68 400.682L1058.44 400.937L1057.8 401.802L1057.46 403.797L1056.39 403.745L1056.12 404.37L1056.77 405.187L1055.88 407.036L1057.62 409.005L1058.57 409.312L1059.32 412.521L1061.3 413.01L1064.52 415.432L1065.52 415.349L1065.85 415.792L1068.02 419.172L1067.22 423.427H1068.75L1068.9 426.198L1070.53 427.552L1071.4 429.083L1068.46 428.458V428.797L1066.25 428.302L1064.64 428.765L1061.58 433.719L1052.48 433.156L1039.32 422.906L1031.22 418.255L1025.01 417.234L1025.68 416.656L1024.48 416.239L1023.17 410.359L1034.16 404.437L1035.22 402.458L1035.68 398.224L1035.46 394.312L1036.09 392.718L1038.02 392.343L1040.8 389.411L1042.67 387.968L1044.6 387.88"
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
