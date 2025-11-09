import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useLocation } from 'react-router-dom';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import clsx from 'clsx';

import styles from './ProfileSlider.module.scss';

export default function ProfilePayments() {
  const { t } = useTranslation();
  const location = useLocation();

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
        <SwiperSlide>
          <div className={styles.slide}>
            <div className={clsx(styles.slideEmg)}>
              <img src="/temp/slide.jpg" alt="" />
            </div>
            <div className={styles.slide__cont}>
              <h2 className={styles.slideTtl}>
                Амбасадор Time2Fest у Нью-Йорку
              </h2>
              <div className={styles.slideText}>
                <p>
                  Цього року у нас є спеціальний амбасадор у Нью-Йорку, який
                  наживо покаже, як місто зустрічає Новий рік.
                </p>
              </div>
              <button className={clsx(styles.slideBtn, 'btn_primary')}>
                Переглянути
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide}>
            <div className={clsx(styles.slideEmg)}>
              <img src="/temp/slide.jpg" alt="" />
            </div>
            <div className={styles.slide__cont}>
              <h2 className={styles.slideTtl}>
                Амбасадор Time2Fest у Нью-Йорку
              </h2>
              <div className={styles.slideText}>
                <p>
                  Цього року у нас є спеціальний амбасадор у Нью-Йорку, який
                  наживо покаже, як місто зустрічає Новий рік.
                </p>
              </div>
              <button className={clsx(styles.slideBtn, 'btn_primary')}>
                Переглянути
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide}>
            <div className={clsx(styles.slideEmg)}>
              <img src="/temp/slide.jpg" alt="" />
            </div>
            <div className={styles.slide__cont}>
              <h2 className={styles.slideTtl}>
                Амбасадор Time2Fest у Нью-Йорку
              </h2>
              <div className={styles.slideText}>
                <p>
                  Цього року у нас є спеціальний амбасадор у Нью-Йорку, який
                  наживо покаже, як місто зустрічає Новий рік.
                </p>
              </div>
              <button className={clsx(styles.slideBtn, 'btn_primary')}>
                Переглянути
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
