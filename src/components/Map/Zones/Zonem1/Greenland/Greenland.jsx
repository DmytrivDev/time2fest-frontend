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
      id="Greenland"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="GL"
      data-label={`${t('countries.greenland')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M709.742 151.106L711.372 152.731L711.445 154.695L712.211 155.939L715.544 157.867H719.075L719.872 154.195L720.367 157.856L722.049 157.361L722.45 158.32L724.325 157.637L723.429 156.679L724.232 155.82L723.461 155.58L724.424 155.502L723.325 155.268L723.914 154.83L722.617 154.653L723.586 154.627L724.31 153.351L722.331 153.158L723.82 152.632L723.164 152.169L720.648 152.434L723.544 151.867L723.065 151.252L723.69 151.564L723.721 150.986L722.534 150.466L724.091 149.929L722.976 149.716L723.784 149.257L722.94 148.846L723.393 148.46L721.414 148.549L720.081 150.59L719.586 148.622L720.143 147.544L721.586 147.424L721.304 147.044L722.726 146.148L721.56 146.398L721.127 145.997L719.169 147.637L719.122 146.903L720.174 145.794L716.737 147.148L717.351 146.122L719.726 144.695L716.476 143.669L715.888 142.799L714.237 142.33L713.263 142.674L712.711 141.221L710.45 140.236"
        fill="#FA7850"
      />
      <path
        d="M791.889 151.413L790.499 152.757L786.046 154.163L791.889 151.413Z"
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
