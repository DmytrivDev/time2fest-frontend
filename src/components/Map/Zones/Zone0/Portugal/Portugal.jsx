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
      id="Portugal"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="PT"
      data-label={`${t('countries.Portugal')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M790.555 360.04L791.144 360.748L790.55 361.332L790.738 362.03L792.081 361.384L793.477 361.936L796.581 361.103L798.467 361.196L798.738 362.587L800.488 363.514L799.79 364.603L796.873 366.681L797.368 369.91L796.368 374.639L793.863 374.65L795.363 377.358L796.712 378.358L794.925 381.462L795.993 383.212L796.826 383.098L794.41 385.738L793.962 386.999L794.358 388.572L792.274 389.91L788.988 389.181L786.649 389.827L787.608 387.494L787.149 381.577L787.597 382.056L788.342 381.853L787.858 381.056L785.576 381.947L785.269 380.499L786.321 380.811L786.972 379.895L786.691 378.952L785.431 380.28L784.186 379.9L784.925 376.837L785.686 376.176L787.113 372.462L787.743 369.322L788.524 368.462L788.358 368.066L787.936 368.54L788.342 366.004L787.227 362.202L787.863 361.228L790.555 360.04Z"
        fill="#F0F032"
      />
      <path
        d="M749.542 413.52C749.542 414.848 748.464 415.921 747.141 415.921C745.818 415.921 744.74 414.848 744.74 413.52C744.74 412.197 745.818 411.124 747.141 411.124C748.464 411.124 749.542 412.197 749.542 413.52Z"
        fill="#F0F032"
      />
      <path
        d="M752.529 412.094C752.529 413.422 751.456 414.495 750.128 414.495C748.805 414.495 747.732 413.422 747.732 412.094C747.732 410.771 748.805 409.698 750.128 409.698C751.456 409.698 752.529 410.771 752.529 412.094Z"
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
