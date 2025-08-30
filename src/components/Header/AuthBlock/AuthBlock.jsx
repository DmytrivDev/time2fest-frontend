import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';

import styles from './AuthBlock.module.scss';

const AuthBlock = ({ isAuth = false, user = null }) => {
  const handleLogin = () => {
    // TODO: Реалізація входу
  };

  return (
    <div className={styles.auth__block}>
      <UserMenu user={user} />
      <LanguageSelector />
    </div>
  );
};

export default AuthBlock;