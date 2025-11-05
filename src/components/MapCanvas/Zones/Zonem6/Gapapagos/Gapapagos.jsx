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
      id="Gapapagos"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="EC"
      data-label={`${t('countries.galápagos-islands')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <g>
        <path
          d="M382.807 583.641L381.542 583.5L381.573 582.688L382.667 582.948L382.807 583.641Z"
          fill="#14D2DC"
        />
        <path
          d="M379.887 587.081L378.195 586.352L379.111 585.305L380.356 584.914L378.96 583.368L378.648 582.029L377.799 581.94L378.96 581.081L381.773 585.565L379.887 587.081Z"
          fill="#14D2DC"
        />
        <path
          d="M384.541 585.401L383.462 585.578L383.082 584.62L384.442 584.276L384.837 584.719L384.541 585.401Z"
          fill="#14D2DC"
        />
        <path
          d="M378.047 584.308L377.485 583.376L378.568 583.224L378.792 584.131L378.047 584.308Z"
          fill="#14D2DC"
        />
        <path
          d="M388.074 586.574L387.938 585.96L389.386 585.371L388.074 586.574Z"
          fill="#14D2DC"
        />
        <path
          d="M383.621 587.988L383.699 588.498L383.246 588.529L383.621 587.988Z"
          fill="#14D2DC"
        />
      </g>
      <path
        d="M394 593L374 593V578H394V593Z"
        fill="#D9D9D9"
        fillOpacity="0.01"
        stroke="#272727"
        strokeWidth="0.5"
      />{' '}
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
