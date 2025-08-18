import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const { t } = useTranslation('common');
  return <button className={styles.login__btn}>{t('log-in')}</button>;
};

export default UserMenu;
