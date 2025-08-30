import { useMemo } from 'react';
import { getNextNYLocalForUtcOffset } from '@/utils/ny-time';
import clsx from 'clsx';

import Andorra from './Andorra';
import Spain from './Spain';
import Algeria from './Algeria';
import Camerun from './Camerun';
import Benin from './Benin';
import Chad from './Chad';
import Nigeria from './Nigeria';
import Niger from './Niger';
import EquatorialGuinea from './EquatorialGuinea';
import DRC from './DRC';
import Congo from './Congo';
import Gabon from './Gabon';
import CAR from './CAR';
import Angola from './Angola';
import Tunisia from './Tunisia';
import Malta from './Malta';
import Luxemburg from './Luxemburg';
import Belgium from './Belgium';
import Switzerlend from './Switzerlend';
import Netherlands from './Netherlands';
import Italy from './Italy';
import Vatican from './Vatican';
import France from './France';
import Monaco from './Monaco';
import Hungary from './Hungary';
import Czechia from './Czechia';
import Montenegro from './Montenegro';
import Croatia from './Croatia';
import Slovakia from './Slovakia';
import Slovenia from './Slovenia';
import NorthMacedonia from './NorthMacedonia';
import Austria from './Austria';
import Albania from './Albania';
import Serbia from './Serbia';
import Poland from './Poland';
import BIH from './BIH';
import Germany from './Germany';
import Sweden from './Sweden';
import Denmark from './Denmark';
import Norway from './Norway';
import Morocco from './Morocco';
import WestSahara from './WestSahara';
import Kosovo from './Kosovo';
import Liechtenstain from './Liechtenstain';
import SanMarino from './SanMarino';

export default function Zone({ onZoneClick }) {
  const ZONE_ID = 'UTC+1';
  const ny = useMemo(() => getNextNYLocalForUtcOffset(ZONE_ID), []);

  const handleZoneClick = () => {
    onZoneClick?.(ZONE_ID); // клік по фону зони
  };

  return (
    <g className={clsx('zone', 'greenCtrs')}>
      <g
        className="zoneM"
        data-tt="1"
        data-id={ZONE_ID}
        data-flags="AD, ES, DZ, CM, BJ, TD, NG, NE, GQ, CD, CG, GA, CF, AO, TN, MT, LU, BE, CH, NL, IT, SM, VA, FR, MC, HU, CZ, ME, HR, SK, SI, MK, AT, AL, RS, PL, BA, DE, SE, DK, NO, MA, EH, XK, LI"
        data-label={ZONE_ID}
        data-time={ny.display}
        onClick={handleZoneClick}
      >
        <path
          d="M868.5 216.5V0H942.5L942.595 51.1034H1000.5V111H942.5V154L944 153L948.5 151.5L957 150L960.5 150.5L963.5 152L967 150.5L972 151L979.5 154L982 154.5L986 157L988 160L984 163.5V165.5L983.5 166L981.5 165.5H981H980.5L979.5 167L976.5 168L975 170H974.5V168.5L976 166L975.5 165L971.5 163L969.5 161.5L968 161L966.5 162L962.5 162.5L960 164.5L959.5 165.5L958 171.5H957L955 174H954.5L949.5 172L949 172.5L942.5 173L940 170L937 168L935.5 168.5L935 169.5V170H934V170.5L946 177.5L947.5 179L948 180L947.5 183.5L948.5 184.5L949 185L948 186V186.5L950 189L948.5 193.5L949.5 194.5L950 196L951 197.5L950.5 200L937.5 215L933.5 216.5L928.5 222L927.5 223V224L926 239L925.5 241.5L930.5 246.5L932.5 251.5L932 255.5V258V258.5L930.5 260.5L930 262L925.5 272L925 272.5L925.5 276L926.5 279L928 281.5L929 282L935.905 282.5H944H945L946.5 283L947.5 285.5L948 287L949.5 290.5V293L946 296.5L947.5 297.5L948 298L947.5 300.5L948 301.5L949.5 305L950.5 306H950V307.5V308.5L948 309.5L947.5 310L943.5 314V314.5V316.5L944 317.5H942.5L940.5 320.5V321.5L944.5 324.5L940.5 327L938.5 330L936 334.5L935.5 335L931.5 336L934 339.5V340L937.5 342L938 343.5L937 344L941 346L942 345H943.5V345.5H943L942.5 346.5L943.5 347.5L942 350L942.5 352L944.5 353.5L945 354L942 356L942.5 358L942 359V359.5L945 362.5L944.5 364.5L944 365L943 366H941L939.5 366.5L939 367L935 367.5V369L934 370L933 372L932 372.5V373.5H931.5V374.5L929 374L930.5 376.5H931.5L933 378.5L933.5 379L932 383.5L933.5 384.5L934.5 386.5L936.5 386L938.5 388L938 389.5L938.5 391L940.5 390L941.5 391.5L942.5 393.792V413.5L940 412.5L933 414.5L929.5 418L930 420.5L930.5 422.5L930 424.5L928 426.5L926.5 427L924.5 426.5L920 424L914 422H911L908.5 420.5L906.5 415.5L903.5 415L900 413.5L895.5 413L893.5 413.5L888 411.5V415.5L885.5 417L882 419.5L881.5 424.5L880.5 426.5L878.5 427.5L877.5 428V428.5L879.5 433V438L880.5 440.5L879.5 443.5L880 447.5L879 448L877.5 449.5L880 453L881 456.5L882 458H883H884L887.5 459L890 463L891 463.5L898 465L901.5 468L909.5 464L910 463.5L950 484V503.5H945.5L944.5 504.5L943.5 508.5L942 509.5L942.5 511.5L940.5 513V513.5L941 515V515.5L939 518L940 519H941.5L942.5 522H943L942.5 524L944.5 526V527.5L948 532.5L948.5 533.5L948 536L947.5 536.5V537L948 538.5L950.5 539L951 541L954 541.5L956 543L956.5 544L962 549L961.5 550L962 552L963.5 552.5L966 554L966.5 555.5L965 556L962 556.5L961 556H959.5H959L957.5 555L956.5 555.5V556.5L954 557.5L952 557L947 559L944.5 558L943.5 559L942.5 561.5L944.5 563L946 562.5L947.5 563L947 564H945.5L943.5 565L944 566L944.5 567L945 567.5L945.5 569L947 569.5L948 571H946L945.5 571.5H944.5L944 572H943L941.5 574.5L943 575L945 580L946 582L946.5 583L945.5 584H947L948 585L947 585.5V586.5L950 588.5L951 589L951.5 590.5H949L948 592H946.5L945.5 591L943.5 590.5L942.5 591L941 591.5V594L940.5 593.5L939 594.5L937.5 593.5L937 594H935L933.5 599V602.5L931.5 603.5H930.5L931 607L930.5 610.5L930 611.5L928.5 612.5L930 616.5L932.5 616L933 616.5V618H939V621.5L939.5 623L939 628.5L939.5 629.5L941 631L941.5 634.5L941 636L941.5 637.5L942.5 637L949 636.5L950 636V643.5L949.5 645.5L950 646.5L940 646.721V662.5L941 664.5L947 670L939 671.5L935 672L925 671L922 669H900.5L897 666.5L895.5 667L893.5 668H889L889.5 672.5L894.5 679.5L898 687.5L903 696.5V704L904.5 708V712.5L907 721L909 724.5L912.5 727.5L918 740L921.5 746V747.5L921 749.5H920.5H920L919 750.5L919.5 751.5L920.5 752L922 755.5L921.5 757L922.5 759L923.5 758L924.5 759.5L925.5 759L927 760.5L930.5 761.5L934 759.5L939.5 759L941 757.5H942.5L942.5 912H868V887H843V876L868.5 876.195V592H868H855.662V586.314H871V570H868.5V559.5H867L866.5 560H866L865.5 560.5H865L864.5 561L863.5 560.5L862 561L860 560L858.5 559L858 555.5L856.5 554L853 550.5L849 550L848 550.5L840 551L839 548.5V537L838 535V532.5L835 530L835.5 527.5L836.5 527V526.5L838 525H841L842.5 524L843 522.5L841.5 520.5L842.5 520L842 519H840L836 517L836.5 515.5H837L835.5 514L834 513.5L832.5 510V507.5L838 505.5H848.5L850.5 503.5L852 500V486.5V486L850 486.5L847 486L847.5 485L847 482.5L842 480H840L839 478.5L837 478V476L788.5 443.5H788V450H771.5V463.5L768.5 464.5L767.5 465.5L766 467L766.763 474.5H747V471.5L749 470L752.5 462.5L752 462L757 457.5L757.5 453.5L759 450.5L759.5 449L763.5 446.5L764 445.5L766 441.5L767 440L773 438.5L779 434L782.5 430L783.5 427L782.5 425.5V421.5L784.5 418L785 415L789 411L796 408L797.5 406L800 401.5L801.5 397.5V396.5L801 394L799.5 391.5L800 390.5H799L796.5 389L797 388.5H794.5L794 387L794.5 385.5L797 383H796L795 381.5L796.5 378.5L795.5 377.5L794 374.5H796.5L797.5 370L797 366.5L799.5 365L800.5 363.5L799 362.5L798.5 361.5L796.5 361L793.5 362L792 361.5L791 362L790.5 361.5L791 361V360.5L790.5 360L787 361.5L787.5 359.5L788 358.5H787L788 357L786 357.5V356.5L785 355L787 353H788.5L790.5 352.5V351.5L791.5 350.5L792.5 351L793 350.5L794.5 351L796.5 352L802 351L803 351.5L809 352.5L813.5 352L815.5 353L817.5 352.5L819.5 353H822L823.5 351.5L825 346L826 345L825.5 343.5V340.5L825 339V338L824 335.5L823.5 335L822 334.5L820.5 332.5L815.5 328.5L813.5 325.5L811 325L809.5 325.5L808 324L809.5 323L808 322H809.5L808 321L815.5 319L819 314.5L821.5 313L823.5 313.5H824.5V314L825.5 315.5L831 316L833 315L831.5 314.5L832 313.5L833 313L839.5 310.5L839 306L843.5 304.5L847.5 302.5L848 301.5L849 300.5L850 299.5L852 297.5L853 296L853.5 294L854 293L855 290.5L856.5 289L858 288.5H860L866 287L868.5 286.5V259H866L863 258L861.5 256.5L858 255L856 252.5V251L854.5 249L855 246.5L854 244.5L854.5 242.5L853.5 240L853 237.5L852 235.5L853.5 232.5L852.5 229.5L854.5 225.5L862 222L864 219.5L866.5 218.5L868.5 216.5Z"
          fill="#D9D9D9"
          fillOpacity="0.01"
        />
      </g>
      <Andorra ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Spain ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Algeria ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Camerun ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Benin ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Chad ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Nigeria ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Niger ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <EquatorialGuinea ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <DRC ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Congo ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Gabon ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <CAR ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Angola ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Tunisia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Malta ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Luxemburg ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Belgium ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Switzerlend ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Netherlands ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Italy ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <SanMarino ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Vatican ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <France ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Monaco ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Hungary ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Czechia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Montenegro ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Croatia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Slovakia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Slovenia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <NorthMacedonia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Austria ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Albania ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Serbia ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Poland ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <BIH ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Germany ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Sweden ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Denmark ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Norway ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Morocco ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <WestSahara ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Kosovo ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
      <Liechtenstain ny={ny} utc={ZONE_ID} onClick={onZoneClick} />
    </g>
  );
}
