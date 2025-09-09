import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useAfterLoad } from '../../hooks/useAfterLoad';

import styles from './AboutSection.module.scss';

const AboutPortalSection = () => {
  const locale = getValidLocale();
  const pageLoaded = useAfterLoad(); // ✅ чекаємо window.load + 1s

  const { data, isLoading, error } = useQuery({
    queryKey: ['about', locale],
    queryFn: async () => {
      const res = await api.get(`/about?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: pageLoaded, // 🚀 запит запуститься тільки після завантаження сторінки
  });

  if (!pageLoaded || isLoading) {
    return (
      <section className={styles.section}>
        <picture>
          <source srcSet="/about/bg.avif" type="image/avif" />
          <source srcSet="/about/bg.webp" type="image/webp" />
          <img
            src="/about/bg.jpg"
            className={styles.bgImage}
            alt=""
            loading="eager"
            decoding="async"
          />
        </picture>

        <div className="container">
          <div className={clsx(styles.loadingTitle, 'loading')}></div>

          <ul className={styles.list}>
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className={clsx(styles.loadingItem, 'loading')} />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) return null;

  return (
    <section id="about" className={styles.section}>
      <picture>
        <source srcSet="/about/bg.avif" type="image/avif" />
        <source srcSet="/about/bg.webp" type="image/webp" />
        <img
          src="/about/bg.jpg"
          className={styles.bgImage}
          alt=""
          loading="eager"
          decoding="async"
        />
      </picture>

      <div className="container">
        <h2>{data.Title}</h2>

        <ul className={styles.list}>
          {data.items.map(item => (
            <li key={item.id}>
              <div className={styles.topItem}>
                {item.Icon?.url && (
                  <span>
                    <img
                      src={`${import.meta.env.VITE_STRIPE_URL}${item.Icon.url}`}
                      alt={item.Icon.alternativeText || item.Icon.name}
                    />
                  </span>
                )}

                <h3>{item.Title}</h3>
              </div>

              {item.Description && (
                <p className={styles.text}>{item.Description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPortalSection;
