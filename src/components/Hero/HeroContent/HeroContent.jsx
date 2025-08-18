import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { IoTime, IoGlobeOutline, IoPersonAddSharp } from 'react-icons/io5';

import styles from './HeroContent.module.scss';

const HeroContent = () => {
  const { t } = useTranslation('common');

  const badges = [
    { icon: <IoTime />, label: t('bages.zones') },
    { icon: <IoGlobeOutline />, label: t('bages.countries') },
    { icon: <IoPersonAddSharp />, label: t('bages.unique_streamers') },
  ];

  return (
    <div className={styles.hero__left}>
      <ul className={styles.hero__badges}>
        {badges.map((badge, index) => (
          <li key={index}>
            {badge.icon} {badge.label}
          </li>
        ))}
      </ul>
      <h1 className={styles.hero__title}>{t('hero_title')}</h1>
      <p className={styles.hero_description}>
        <Trans i18nKey="hero_desc" components={[<br />]} />
      </p>
      <div className={styles.hero_buttons}>
        <button className="btn btn_primary">{t('hero_btn1')}</button>
        <button className="btn btn_secondary">{t('hero_btn2')}</button>
      </div>
    </div>
  );
};

export default HeroContent;
