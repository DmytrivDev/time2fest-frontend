import clsx from 'clsx';
import Marquee from 'react-fast-marquee';
import useFloatingDecors from '../../hooks/useFloatingDecors';
import styles from './AboutTech.module.scss';

const AboutTech = ({ data, isLoading, error }) => {
  useFloatingDecors(!isLoading ? `#about-tech .dec` : null, 10);

  if (isLoading) {
    return (
      <section
        id="about-tech"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={clsx(styles.loadingTitle, 'loading')} />
              <div className={clsx(styles.loadingText, 'loading')} />
            </div>
            <div className={clsx(styles.imageWrapper, 'loading')}>
              <img
                src="/aboutPage/devices_sk.png"
                alt="devices preview"
                className={styles.image}
              />
            </div>
            <div className={clsx(styles.marqueeLine, styles.marqueeLineLoad, 'loading')}></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="about-tech" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={clsx(styles.sircle, styles.s1)}></div>
          <div className={clsx(styles.sircle, styles.s2)}></div>
          <div className={clsx(styles.sircle, styles.s3)}></div>
          <div className={clsx(styles.sircle, styles.s4)}></div>
          <div className={clsx(styles.sircle, styles.s5)}></div>
          <div className={clsx(styles.dec, styles.dec1, 'dec')}></div>
          <div className={clsx(styles.dec, styles.dec2, 'dec')}></div>
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
            {data.Undertitle && (
              <p className={styles.undertitle}>{data.Undertitle}</p>
            )}
          </div>

          <div className={styles.imageWrapper}>
            <img
              src="/aboutPage/devices.png"
              alt="devices preview"
              className={styles.image}
            />
          </div>

          {/* бігучий рядок */}
          <div className={styles.marqueeLine}>
            <Marquee gradient={false} speed={80} pauseOnHover>
              {data.TechnicList?.map(item => (
                <div key={item.id} className={styles.marqueeItem}>
                  <img src="/aboutPage/trace.svg" alt={item.Item} />
                  <span>{item.Item}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
