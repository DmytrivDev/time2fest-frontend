import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';
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
      id="Australia"
      className={clsx('countryGr')}
      data-tt="2"
      data-id={utc}
      data-country="AU"
      data-label={`${t('countries.australia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1469.64 739.802V744.153L1461.94 747.3V742.853L1469.64 739.802Z"
        fill="#F0F032"
      />
      <path
        className='greenH'
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1469.68 739.803L1461.98 742.854V744.723L1469.68 740.271V739.803ZM1469.68 742.318L1461.98 746.771V747.301L1469.68 744.154V742.318Z"
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
