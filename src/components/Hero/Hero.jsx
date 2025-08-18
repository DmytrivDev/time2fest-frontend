import React from 'react';
import HeroContent from './HeroContent';
import HeroCountdown from './HeroCountdown';

import { useCountdownToTimezone } from '@/hooks/useKiritimatiNYCountdown'; // шлях підлаштуй під свій alias
import bg from '@assets/hero/bg.jpg';
import styles from './Hero.module.scss';

const Hero = () => {
  const countdown = useCountdownToTimezone(14); // { days, hours, minutes, seconds }

  return (
    <section id="new-year" className={styles.hero}>
      <div className={styles.overlay}></div>
      <img src={bg} className={styles.background} alt="Hero" />
      <div className="container">
        <div className={styles.hero__inner}>
          <HeroContent />
          <HeroCountdown {...countdown} />
        </div>
      </div>
    </section>
  );
};

export default Hero;