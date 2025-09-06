import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BsThreads } from 'react-icons/bs';

import styles from './SocialLinks.module.scss';

const socials = [
  { href: 'https://www.facebook.com/profile.php?id=61574092427016', icon: <FaFacebookF />, label: 'Facebook' },
  { href: 'https://www.instagram.com/time_2_fest/', icon: <FaInstagram />, label: 'Instagram' },
  { href: 'https://www.threads.com/@time_2_fest', icon: <BsThreads />, label: 'Threads' },
  { href: 'https://www.linkedin.com/company/time2fest/', icon: <FaLinkedin />, label: 'LinkedIn' },
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
