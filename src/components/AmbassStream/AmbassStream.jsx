import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './AmbassStream.module.scss';

const AmbassStream = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <section
        id="ambass-stream"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            <div className={styles.header}>
              <div
                className={clsx(styles.loadingTitle, styles.title, 'loading')}
              ></div>
            </div>
            <div className={styles.slideCont}>
              <div className={styles.slider}>
                <div className={clsx(styles.slide)}>
                  <div className={clsx(styles.imageWrapper, 'loading')}></div>
                  <div className={styles.textWrapper}>
                    <div className={clsx(styles.loadSlTitle, 'loading')}></div>
                    <div className={clsx(styles.textLoadCont)}>
                      <span className="loading"></span>
                      <span className="loading"></span>
                      <span className="loading"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  const slides = data.StreamList || [];

  return (
    <section id="ambass-stream" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
          </div>

          <div className={styles.slideCont}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={0}
              slidesPerView={1}
              breakpoints={{
                1140: {
                  spaceBetween: 0,
                  navigation: true,
                },
                0: {
                  spaceBetween: 16,
                  navigation: false,
                },
              }}
              className={clsx(styles.slider, 'streamSlider')}
            >
              {slides.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div className={styles.slide}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={`${import.meta.env.VITE_STRIPE_URL}${item.Icon?.url}`}
                        alt={item.Icon?.alternativeText || item.Title}
                      />
                    </div>
                    <div className={styles.textWrapper}>
                      <h3>
                        {index + 1}. {item.Title}
                      </h3>
                      <p>{item.Text}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbassStream;
