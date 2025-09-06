import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/common/Logo';
import SocialLinks from '@/components/common/SocialLinks';

import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.part}>
            <Logo />
          </div>
          <div className={styles.part}>
            <div className="copyright">
              © {new Date().getFullYear()} Time2Fest. {t('copy')}.
            </div>
          </div>
          <div className={styles.part}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
