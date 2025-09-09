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
      id="CostaRica"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CR"
      data-label={`${t('countries.CostaRica')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        id="CostaRica"
        d="M406.981 526.854L407.439 526.167L411.038 527.438L412.679 527.115L414.621 528.323L416.543 528.375L417.111 527.61L418.621 530.73L420.991 533.433L422.481 534.407L421.017 534.271L420.653 536.917L421.726 537.646L420.757 538.584L421.158 539.302L420.08 540.578L420.819 542.078L419.585 540.386L419.679 539.256L418.694 538.651L418.028 538.839L418.866 540.37L417.236 539.756L416.679 539.131L417.205 537.037L414.33 534.912L412.002 533.974L411.72 532.453L409.106 531.068L409.58 532.136L411.064 533.146L409.851 534.464L409.288 533.599L406.965 532.349L406.424 529.714L407.283 529.12L407.049 528.235L405.741 527.771L406.47 527.688L406.981 526.854Z"
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
