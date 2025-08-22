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
      id="Suriname"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="SR"
      data-label={`${t('countries.Suriname')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M558.261 553.041L558.116 552.296L563.694 553.046L563.017 555.395L561.616 557.025L561.511 558.671L563.892 563.999L562.871 568.072L560.855 570.359L559.183 568.963L557.058 569.843L554.09 569.364L553.616 570.77L554.418 572.52L551.616 572.265L550.475 571.77L548.178 568.181L547.444 565.166L545.813 565.27L543.72 561.489L544.902 557.468L547.574 556.989L547.767 554.708L548.668 552.432L550.954 552.452L554.444 553.786L554.657 552.411L557.636 552.577L558.261 553.041Z"
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
