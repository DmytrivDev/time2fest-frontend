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
      id="SieraLeone"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SL"
      data-label={`${t('countries.sierra-leone')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M774.302 532.254L775.734 532.311L777.979 536.764L778.818 536.936L779.281 539.009L778.219 540.707L780.328 539.785L780.177 541.202L778.943 541.754L778.463 543.514L774.26 547.556L769.302 545.29L769.906 545.254L769.63 544.566L770.828 544.28L769.505 544.436L769.422 543.41L768.255 543.697L767.5 543.165L766.922 540.983L766.005 541.379L765.396 539.785L766.604 540.358L767.396 538.868L767.057 539.264L766.062 539.051L766.182 538.014L766.807 537.973L765.333 537.072L766.734 536.733L769.317 532.915L774.302 532.254Z"
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
