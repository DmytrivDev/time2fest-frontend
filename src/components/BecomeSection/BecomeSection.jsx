import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { api } from '../../utils/api';
import { useAfterLoad } from '../../hooks/useAfterLoad';
import { getValidLocale } from '../../utils/getValidLocale';

import girlImage from '../../assets/become/video.mp4';

import styles from './BecomeSection.module.scss';

const BecomeSection = () => {
  const [hasError, setHasError] = useState(false);

  const locale = getValidLocale();
  const pageLoaded = useAfterLoad();

  const { data, isLoading, error } = useQuery({
    queryKey: ['become', locale],
    queryFn: async () => {
      const res = await api.get(`/become?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: pageLoaded, // 🚀 запит лише після window.load
  });

  if (!pageLoaded || isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.loadingTitleCont}>
              <span className={clsx(styles.loadingTitle, 'loading')}></span>
              <span className={clsx(styles.loadingTitle, 'loading')}></span>
            </div>

            <ul className={styles.list}>
              {Array.from({ length: 4 }).map((_, index) => (
                <li
                  key={index}
                  className={clsx(styles.loadingItem, 'loading')}
                />
              ))}
            </ul>

            <div className={styles.actions}>
              <div
                className={clsx(styles.loadingBtn, 'btn_primary loading')}
              ></div>

              <p className={clsx(styles.subtext, styles.subtextLoading)}>
                <span className="loading"></span>
                <span className="loading"></span>
              </p>
            </div>

            <div
              className={clsx(styles.imageWrapper, hasError && styles.noimage)}
            ></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="become-streamer" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>
            {data.Title.split('\n').map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </h2>

          <ul className={styles.list}>
            {data.items.map(item => (
              <li key={item.id}>
                <h4>{item.text}</h4>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a
              href={data.buttonlink}
              target="_blank"
              className="btn_primary"
              onClick={() => {
                if (typeof window !== 'undefined' && window.umami) {
                  window.umami.track('click_google_form');
                }
              }}
            >
              {data.buttontext}
            </a>

            <p className={styles.subtext}>{data.text}</p>
          </div>

          <div
            className={clsx(styles.imageWrapper, hasError && styles.noimage)}
          >
            <div>
              <video
                src={girlImage}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setHasError(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSection;
