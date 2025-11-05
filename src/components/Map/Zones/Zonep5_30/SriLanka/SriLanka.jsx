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
    onClick?.(zoneId, code, e);
  };

  return (
    <g
      id="SriLanka"
      className={clsx('countryGr')}
      data-tt="2"
      data-id={utc}
      data-country="LK"
      data-label={`${t('countries.sri-lanka')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        className="greenH"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1230.25 534.908L1235.84 543.728L1236.51 547.346L1235.64 549.486L1230.08 552.513L1227.93 551.742L1226.63 548.856L1225.65 541.283L1226.01 542.078L1226.71 539.448L1226.66 537.452L1227.66 536.227C1227.66 536.227 1227.38 535.31 1227.4 535.261C1227.42 535.212 1227.53 535.117 1227.53 535.117L1228.21 534.787L1228.48 534.938L1230.25 534.908Z"
        fill="#5DBD39"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1228.24 534.784L1228.05 534.876L1227.48 535.442C1227.54 535.698 1227.69 536.224 1227.69 536.224L1226.69 537.448L1226.74 539.444L1226.39 540.778L1231.05 536.116L1230.28 534.903L1228.52 534.935L1228.24 534.784ZM1232.7 538.712L1226.19 545.218L1226.66 548.853L1226.7 548.95L1234.34 541.31L1232.7 538.712ZM1225.68 541.28L1225.71 541.46L1225.75 541.419L1225.68 541.28ZM1235.92 543.974L1228.1 551.79L1230.11 552.509L1233.44 550.694L1236.37 547.767L1236.54 547.343L1235.92 543.974Z"
        fill="#14D2DC"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
