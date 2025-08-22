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
      id="Maurutania"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MR"
      data-label={`${t('countries.Maurutania')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M788.236 443.427L807.345 455.562L798.579 455.568L803.928 499.818L804.548 500.251L803.933 504.584H785.673L784.96 503.699L784.554 504.86L778.121 504.855L777.163 506.527L774.184 503.824L773.163 504.344L772.663 507.626L771.449 508.485L770.528 508.298L765.6 503.891L764.47 501.396L762.652 501.303L760.168 498.824L756.642 498.652L753.184 499.553L750.616 499.391L749.324 501.73L751.741 493.24L750.85 486.719L749.585 485.318L750.517 484.037L749.673 484.641L750.777 482.662L750.96 480.474L749.908 478.151L749.204 478.599L747.418 475.646L746.73 477.652L747.402 474.683H766.788L766.158 467.193L767.329 465.568L768.809 464.594L771.736 463.672V450.281H788.236L788.236 443.427Z"
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
