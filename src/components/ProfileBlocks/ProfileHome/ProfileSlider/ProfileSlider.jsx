import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import ProfileSlideItem from './ProfileSlideItem';

import styles from './ProfileSlider.module.scss';

export default function ProfileSlider({ data = [], isLoading, error }) {
  const location = useLocation();

  if (isLoading) {
    return (
      <section className={styles.profileSlider}>
        <div
          className={clsx(styles.slider, styles.sliderLoading, 'loading')}
        ></div>
      </section>
    );
  }

  if (!data || !data.length) {
    return null;
  }

  return (
    <section className={styles.profileSlider}>
      <Swiper
        key={location.pathname}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        className={clsx(styles.slider, 'profileSlider')}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <ProfileSlideItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
