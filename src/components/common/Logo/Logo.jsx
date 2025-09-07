import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const Logo = () => (
  <Link to="/" className={styles.logo}>
    <img src="/logo.svg" alt="TIME2FEST" />
  </Link>
);

export default Logo;
