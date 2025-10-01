import { useTranslation, Trans } from 'react-i18next';
import { addToCalendar } from '@/utils/addToCalendar';
import { IoTime, IoGlobeOutline, IoPersonAddSharp } from 'react-icons/io5';

import styles from './HeroContent.module.scss';

const HeroContent = () => {
  const { t } = useTranslation('common');

  const badges = [
    { icon: <IoTime />, label: t('bages.zones') },
    { icon: <IoGlobeOutline />, label: t('bages.countries') },
    { icon: <IoPersonAddSharp />, label: t('bages.unique_streamers') },
  ];

  const scrollToBlock = id => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.hero_left}>
      <ul className={styles.hero_badges}>
        {badges.map((badge, index) => (
          <li key={index}>
            {badge.icon} {badge.label}
          </li>
        ))}
      </ul>

      <h1 className={styles.hero_title}>{t('hero_title')}</h1>

      <p className={styles.hero_description}>
        <Trans i18nKey="hero_desc" components={[<br />]} />
      </p>

      <div className={styles.hero_buttons}>
        <button
          onClick={() => scrollToBlock('new-year')}
          className="btn btn_primary"
        >
          {t('hero_btn1')}
        </button>

        <button onClick={() => addToCalendar(t)} className="btn btn_transp">
          {t('hero_btn2')}
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
