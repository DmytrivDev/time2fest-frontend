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
      id="Brazil"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="BR"
      data-label={`${t('countries.Brazil')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M465.861 617.214L466.804 615.573L469.236 613.756L468.991 612.579L470.502 607.292L475.231 604.282L479.976 603.584L481.471 602.37L483.002 602.479L483.299 603.073L484.575 603.24L500.335 630.751L501.277 631.152L498.751 633.011L496.21 634.698L494.288 635.547L493.158 636.464L491.611 637.105L490.793 637.256L488.986 636.662L486.788 636.318L485.001 636.141L483.048 636.907L482.017 636.235L481.522 636.61L481.538 630.745L482.017 630.193L481.621 629.422L482.069 628.756L478.262 631.521L473.83 631.568L473.168 629.183L468.783 628.6L469.96 627.282L469.991 626.537L467.23 623.422L466.725 621.599L466.355 620.573L464.84 619.381L465.496 618.792L466.277 618.193L465.861 617.214Z"
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
