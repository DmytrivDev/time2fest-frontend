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
      id="Switzerlend"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="CH"
      data-label={`${t('countries.Switzerlend')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M873.756 325.453L874.214 326.026L874.22 326.031L878.501 327.11L878.871 328.182L878.334 328.781L878.017 330.057L878.657 330.099L881.256 331.438L882.537 330.49L882.975 331.302L882.907 333.349L881.178 332.912L880.866 333.906L881.444 334.162L881.324 335.281L877.116 333.62L876.897 335.25L875.277 337.729L874.928 336.214L872.97 335.203L873.017 333.906L871.496 334.849L870.027 337.214L868.621 336.792L865.985 337.13L865.017 335.891L864.761 334.021L863.985 334.104L862.423 334.208L860.688 335.849L861.48 334.693L861.194 334.073L863.287 330.688L866.079 328.365L865.209 328.214L865.741 327.406L867.715 327.776L868.704 326.833L873.595 326.792L873.762 326.313L873.22 326.432L872.991 325.896L873.756 325.453Z"
        fill="#5DBD39"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
