import { useNewYearGlobalCountdown } from '@/hooks/useNewYearGlobalCountdown';

import HeroContent from './HeroContent';
import HeroCountdown from './HeroCountdown';

import styles from './Hero.module.scss';

const Hero = () => {
  const countdown = useNewYearGlobalCountdown();
  // {
  //   timezone,
  //   offset,
  //   days,
  //   hours,
  //   minutes,
  //   seconds,
  //   isFinished
  // }

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      {/* Оптимізоване фонове зображення */}
      <picture>
        <source srcSet="/hero/bg.avif" type="image/avif" />
        <source srcSet="/hero/bg.webp" type="image/webp" />
        <img
          src="/hero/bg.jpg"
          srcSet="
            /hero/bg-480.jpg 480w,
            /hero/bg-768.jpg 768w,
            /hero/bg-1280.jpg 1280w,
            /hero/bg-1920.jpg 1920w
          "
          sizes="100vw"
          className={styles.background}
          alt="Hero background"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>

      <div className="container">
        <div className={styles.hero__inner}>
          <HeroContent timezone={countdown.timezone} />
          <HeroCountdown
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
