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
      id="Panama"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PA"
      data-label={`${t('countries.Panama')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M426.554 544.013L427.247 545.576L425.882 544.779L426.554 544.013Z"
        fill="#FA7850"
      />
      <path
        d="M424.301 535.48L424.858 535.803L424.514 535.991L424.301 535.48Z"
        fill="#FA7850"
      />
      <path
        d="M421.014 534.273L420.649 536.918L421.721 537.648L420.752 538.586L421.155 539.305L420.077 540.58L420.815 542.08L421.799 540.643L424.186 540.518L424.471 541.402L426.508 541.262L427.608 543.689L429.102 544.168L429.143 542.736L429.905 542.742L430.555 545.918L432.165 546.024L435.17 544.846L434.852 543.987L432.78 541.789L433.086 540.852L434.967 540.246L436.596 539.059L435.999 539.08L436.649 537.903L439.581 536.887L441.993 538.377L443.03 540.502L443.045 539.512L443.92 539.731L443.805 540.274L444.555 539.981L444.409 539.434L445.967 541.346L444.368 540.205L442.915 541.924L443.633 543.793L445.602 546.055L446.399 543.606L447.133 544.58L449.258 542.518L447.686 539.539L448.19 538.856L445.555 536.742L439.733 534.528L437.571 534.409L434.987 535.903L430.776 537.951L429.139 538.315L425.862 536.377L426.389 537.278L424.805 537.606L422.477 534.408L421.014 534.273Z"
        fill="#FA7850"
      />
      <path
        d="M440.741 539.933L440.616 541.137L440.319 540.21L440.741 539.933Z"
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
