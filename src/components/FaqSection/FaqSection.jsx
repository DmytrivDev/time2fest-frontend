import { useQuery } from '@tanstack/react-query';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import clsx from 'clsx';
import { useState } from 'react';
import { useAfterLoad } from '@/hooks/useAfterLoad'

import styles from './FaqSection.module.scss';
import FaqItem from './FaqItem';

export default function FaqSection() {
  const locale = getValidLocale();
  const [openedId, setOpenedId] = useState(null);
  const pageLoaded = useAfterLoad()

  const toggle = id => {
    setOpenedId(prev => (prev === id ? null : id));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['faq', locale],
    queryFn: async () => {
      const res = await api.get(`/faq?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: pageLoaded, // 🚀 тільки після load
  });

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.content}>
            <div className={clsx(styles.loadingTitle, 'loading')}></div>
            <div className={styles.grid}>
              <ul className={styles.column}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <li
                    className={clsx(styles.loadingItem, 'loading')}
                    key={index}
                  ></li>
                ))}
              </ul>
              <ul className={styles.column}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <li
                    className={clsx(styles.loadingItem, 'loading')}
                    key={index}
                  ></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!pageLoaded) return null;

  if (error) {
    console.error(error);
  }

  if (!data) return null;

  const half = Math.ceil(data.faq.length / 2);
  const left = data.faq.slice(0, half);
  const right = data.faq.slice(half);

  return (
    <section id="faq" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <h2>{data.title}</h2>
          <div className={styles.grid}>
            {[left, right].map((column, colIdx) => (
              <ul key={colIdx} className={styles.column}>
                {column.map(item => (
                  <FaqItem
                    key={item.id}
                    id={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openedId === item.id}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
