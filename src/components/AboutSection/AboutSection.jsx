import { useQuery } from '@tanstack/react-query';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import clsx from 'clsx';

import styles from './AboutSection.module.scss';
import bg from '@assets/about/bg.png';

export default function AboutPortalSection() {
  const locale = getValidLocale();
  const { data, isLoading, error } = useQuery({
    queryKey: ['about', locale],
    queryFn: async () => {
      const res = await api.get(`/about?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
  
  if (isLoading)
    return (
      <section className={styles.section}>
        <img src={bg} className={styles.bgImage} alt="" />
        <div className="container">
          <div className={clsx(styles.loadingTitle, 'loading')}></div>

          <ul className={styles.list}>
            {Array.from({ length: 6 }).map((_, index) => (
              <li className={clsx(styles.loadingItem, 'loading')} key={index}></li>
            ))}
          </ul>
        </div>
      </section>
    );
  if (error) {
    console.error(error);
  }
  if (!data) return null;

  return (
    <section id="about" className={styles.section}>
      <img src={bg} className={styles.bgImage} alt="" />
      <div className="container">
        <h2>{data.Title}</h2>
        <ul className={styles.list}>
          {data.items.map((item) => (
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
              {item.Description && <p className={styles.text}>{item.Description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
