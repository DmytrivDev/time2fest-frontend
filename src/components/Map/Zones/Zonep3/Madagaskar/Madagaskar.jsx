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
      id="Madagaskar"
      className="countryGr"
      data-tt="2"
      data-id={utc}
      data-country="MG"
      data-label={`${t('countries.Madagaskar')} ${utc}`}
      onClick={handlePointerUp}
      data-time={ny.display}
    >
      <path
        d="M1074.96 641.308L1075.45 642.542L1074.8 643.1L1075.24 643.032L1078.37 646.954L1081.01 658.949L1079.77 661.418L1079.32 661.386L1078.05 658.824L1076.85 659.543L1077.07 662.058L1077.9 662.928L1077.24 665.485L1077.74 666.043L1075.77 668.496L1076.07 669.569L1071.75 684.345L1065.9 703.626L1063.6 708.626L1060.12 709.267L1056.53 711.22L1054.58 711.366L1049.02 708.152L1047.32 704.715L1047.14 701.183L1047.64 700.662L1045.76 696.923L1045.18 694.256L1045.28 692.371L1046.3 690.709L1046.49 689.043L1047.99 688.522L1048.48 686.636L1050.83 682.777L1051.31 679.537L1050.25 677.803L1048.63 669.287L1050.33 666.381L1051.22 662.693L1053.2 662.876L1055.15 661.417L1055.34 662.089L1057.27 660.683L1058.65 660.933L1059.59 660.256L1060.3 661.511L1061.15 661.5L1060.56 660.802L1060.61 659.766L1063.53 657.704L1064.03 658.308L1063.6 659.302L1064.95 658.829L1064.34 658.183L1066.01 655.032L1066.3 655.745L1065.85 656.672L1067.72 654.599L1068.52 654.787L1068.8 655.412L1068.44 654.547L1067.39 654.427L1067.76 652.724L1068.47 652.787L1068.37 652.094L1068.88 652.969L1068.4 649.469L1069.06 649.214L1069.65 650.386L1070.21 650.459L1070.47 649.344L1071.28 649.188L1071.21 648.454L1072.75 648.261L1073.47 645.714L1072.48 643.615L1074.96 641.308Z"
        fill="#FA7850"
      />
    </g>
  );
}

Country.propTypes = {
  ny: PropTypes.shape({
    display: PropTypes.string.isRequired,
  }).isRequired,
};
