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
      id="Croatia"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="HR"
      data-label={`${t('countries.Croatia')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M916.556 355.214L918.525 355.646L922.488 357.578L922.728 358.271L916.556 355.214Z"
        fill="#5DBD39"
      />
      <path
        d="M914.622 355.587L914.169 355.176L916.164 355.473L914.622 355.587Z"
        fill="#5DBD39"
      />
      <path
        d="M913.742 353.4L912.466 352.661L914.732 353.135L913.742 353.4Z"
        fill="#5DBD39"
      />
      <path
        d="M902.849 345.267L902.037 341.793L902.797 343.08L902.849 345.267Z"
        fill="#5DBD39"
      />
      <path
        d="M906.249 347.174L904.098 344.705L906.223 346.481L906.249 347.174Z"
        fill="#5DBD39"
      />
      <path
        d="M903.156 341.467L904.067 342.451V343.222L902.557 342.326L903.156 341.467Z"
        fill="#5DBD39"
      />
      <path
        d="M912.089 333.36L913.344 333.756L916.891 336.761L919.771 337.996L921.62 338.194L924.714 337.095L924.73 339.392L927.167 341.412L925.792 341.699L925.381 343.704L922.865 342.298L915.902 341.824L914.855 341.178L912.985 341.47L912.074 342.839L910.751 341.714L909.391 341.673L909.043 343.954L910.568 345.11L911.563 347.793L916.777 352.215L917.558 354.022L918.579 354.803L918.152 355.308L912.641 351.73L910.381 351.965L910.058 350.824L908.079 349.704L906.115 347.746L906.022 347.272L906.99 347.1L908.386 348.1L905.386 345.485L904.798 342.642L903.339 341.392L902.032 340.709L901.261 342.86L900.714 342.668L899.933 344.188L898.501 342.178L898.417 339.902L901.022 339.918L902.949 339.334L903.251 338.767L903.918 339.589L906.516 340.204L907.324 338.886L906.688 338.433L908.819 336.881L908.574 335.501L910.714 334.324L911.73 334.365L911.569 333.667L912.089 333.36Z"
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
