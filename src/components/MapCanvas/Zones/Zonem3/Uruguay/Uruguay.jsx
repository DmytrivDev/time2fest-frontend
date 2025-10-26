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
      id="Uruguay"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="UY"
      data-label={`${t('countries.Uruguay')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M545.995 735.935L548.062 736.446L548.63 735.545L549.911 735.503L553.859 739.185L553.906 740.805L555.141 740.456L555.953 739.529L557.703 741.664L560.854 742.862L561.562 744.039L564.151 745.477L565.995 748.206L567.979 749.43L566.276 751.998L566.203 754.633L566.948 755.451L565.016 759.024L562.307 760.024L562.479 760.701L559.146 762.352L557.057 761.404L553.781 761.862L548.141 759.415L544.885 759.649L542 756.196L542.13 753.685L543.807 751.045L543.063 748.305L543.057 745.269L543.901 744.576L545.047 739.232L544.604 737.826L545.995 735.935Z"
        fill="#5DBD39"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
