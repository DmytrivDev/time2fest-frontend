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
      id="Cuba"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CU"
      data-label={`${t('countries.Cuba')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M446.901 471.12L446.542 471.745L444.88 470.115L445.141 469.834L446.042 471.058L446.901 471.12Z"
        fill="#FA7850"
      />
      <path
        d="M444.994 469.8L443.552 469.071L444.479 469.113L444.994 469.8Z"
        fill="#FA7850"
      />
      <path
        d="M447.461 471.88L447.623 472.193L447.05 471.844L447.461 471.88Z"
        fill="#FA7850"
      />
      <path
        d="M443.354 469.067L441.625 468.343L443.183 468.39L443.354 469.067Z"
        fill="#FA7850"
      />
      <path
        d="M424.781 465.12L432.193 465.703L433.839 466.485L435.615 466.839L436.891 467.349L438.042 468.802L443.255 470.167L446.531 472.375L448.099 473.099L448.047 472.36L450.271 474.073L452.458 475.063L453.401 475.136L454.437 475.953L455.781 475.823L456.917 476.136L457.583 477.813L459.813 478.021L464.135 480.677L462.698 481.281L461.406 481.334L459.484 482.141L459.177 481.782L458.714 482.266L455.427 481.771L446.339 482.266L449.505 479.459L448.307 477.922L447.714 478.094L445.886 477.896L444.031 477.292L442.641 476.266L442.578 474.995L441.771 473.636L436.568 472.927L434.656 472.224L432.443 470.943L429.901 470.886L429.156 469.802L426.161 470.302L424.464 469.203L426.714 468.875L426.974 468.261L425.932 467.734L421.885 467.636L419.896 468.771L418.141 470.287L417.406 470.151L415.635 470.464L415.161 471.719L412.807 472.5L410.641 472.016L413.948 471.198L413.427 469.427L415.953 467.396L424.781 465.12Z"
        fill="#FA7850"
      />
      <path
        d="M419.954 473.587L419.855 472.3L420.486 471.55L421.85 471.884L422.376 472.587L422.564 473.519L422.126 473.759L420.84 474.17L419.954 473.587Z"
        fill="#FA7850"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
