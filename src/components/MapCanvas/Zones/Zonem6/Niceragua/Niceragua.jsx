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
      id="Niceragua"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="NI"
      data-label={`${t('countries.nicaragua')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M407.194 524.307L408.153 525.14L407.309 524.869L407.194 524.307Z"
        fill="#14D2DC"
      />
      <path
        d="M406.514 521.64L405.796 522.296L406.598 525.203L409.561 526.734L411.447 526.901L410.619 524.838L407.15 521.984L406.514 521.64ZM419.65 507.135L418.223 508.067L418.728 508.364L419.369 510.551L417.681 517.031L417.895 520.223L417.27 520.359L417.561 518.708L416.468 519.624L417.046 520.854L416.968 522.067L416.478 521.468L416.197 522.885L417.082 524.213L415.994 525.671L417.103 527.609L416.535 528.374L414.613 528.322L412.671 527.114L411.03 527.437L407.431 526.166L406.973 526.854L402.952 523.4L401.624 521.213L397.072 517.604L397.613 516.854L398.353 517.296L399.046 517.609L399.009 517.26L399.91 517.208L401.103 515.874L402.02 515.676L401.712 513.385L403.733 513.374L405.374 511.822L406.759 513.015L409.619 510.468L409.655 509.291L411.275 507.962L413.004 509.02L419.65 507.135Z"
        fill="#14D2DC"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
