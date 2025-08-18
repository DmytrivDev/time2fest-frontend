import React from 'react';
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaLinkedin } from 'react-icons/fa';

import styles from './SocialLinks.module.scss';

const socials = [
  { href: 'https://facebook.com', icon: <FaFacebookF />, label: 'Facebook' },
  { href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' },
  { href: 'https://t.me', icon: <FaTelegramPlane />, label: 'Telegram' },
  { href: 'https://linkedin.com', icon: <FaLinkedin />, label: 'LinkedIn' },
];

const SocialLinks = ({ isMobile = false }) => (
  <ul className={styles.socials__list}>
    {socials.map(({ href, icon, label }) => (
      <li key={label}>
        <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
          {icon}
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
