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
      id="Dominicana"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="DO"
      data-label={`${t('countries.dominican-republic')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M479.634 481.964L478.529 482.476L476.457 482.142L475.994 483.136L476.009 483.157L475.972 483.175L475.988 485.276L476.535 485.579L475.384 486.929L476.138 487.757L474.759 488.757L476.16 490.329L476.128 490.386L475.966 491.704L475.857 491.612L476.4 493.095L477.634 493.876L479.435 490.251L479.879 490.538L481.373 489.651L481.763 490.464L483.769 490.673L485.228 489.48L490.129 489.823L491.4 490.761L492.951 488.741L490.732 486.892L486.685 486.298L486.572 485.585L488.832 485.194L485.957 485.298L484.847 483.235L484.228 483.476L479.634 481.964Z"
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
