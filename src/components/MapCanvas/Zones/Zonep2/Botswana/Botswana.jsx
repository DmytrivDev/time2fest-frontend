import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function Country({ ny, utc, onClick }) {
  const { t } = useTranslation();

  const handlePointerUp = (e) => {
    e.stopPropagation();              // не віддаємо подію зоні
    const zoneId = e.currentTarget.getAttribute('data-id');          // "UTC+2"
    const code   = (e.currentTarget.getAttribute('data-country') || '').toUpperCase(); // "CY"
    onClick?.(zoneId, code, e);
  };

  return (
    <path
      className="country"
      data-tt="2"
      data-id="UTC+2"
      data-country="BW"
      data-label={`${t('countries.botswana')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
      id="Botswana"
      d="M949.383 673.307L951.799 671.682L956.2 670.938L959.779 677.073L960.706 679.813L965.93 682.745L966.216 684.76L968.378 684.938L968.247 686.87L969.805 690.276L974.992 691.5L974.862 692.094L976.539 693.552L974.857 693.729L974.247 694.938L971.409 695.604L969.117 698.229L964.591 701.688L963.857 704.49L961.825 706.302L959.179 706.901L958.216 710.719L956.633 712.229L953.284 712.604L945.893 709.641L945.133 709.813L944.195 710.756L943.133 714.11L938.424 718.099L934.581 717.74L933.528 718.219L933.32 715.802L934.393 714.292L934.164 712.969L932.091 708.485L930.143 707V692.552L935.091 692.208L935.06 673.578L946.45 671.947L947.93 674.411L949.383 673.307Z"
      fill="#14D2DC"
    />
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
