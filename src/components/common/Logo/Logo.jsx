import React from 'react';
import { Link } from 'react-router-dom';

import logo from '@assets/logo/logo.svg';
import styles from './Logo.module.scss';

const Logo = () => (
  <Link to="/" className={styles.logo}>
    <img src={logo} alt="TIME2FEST" />
  </Link>
);

export default Logo;
