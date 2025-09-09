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
      id="GuineaBissau"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GW"
      data-label={`${t('countries.GuineaBissau')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M751.182 527.107L750.781 526.664L751.63 526.253L751.698 526.873L751.182 527.107Z"
        fill="#F0F032"
      />
      <path
        d="M757.515 518.787L763.265 518.808L763.354 520.74L762.057 521.448L762.739 521.766L763.224 523.652L758.448 524.678L756.895 527.37L756.786 526.428L755.922 526.792L756.067 526.11L754.776 525.735L755.588 525.089L754.427 525.568L755.781 524.188L756.833 524.256L755.203 523.797L754.703 524.438L754.521 523.271L756.494 522.61L757.271 523.402L756.942 522.428L752.276 523.417L752.557 522.49L753.401 522.162L751.286 522.745L750.323 521.417L751.359 520.605L749.729 521.329L748.396 520.594L757.515 518.787Z"
        fill="#F0F032"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
