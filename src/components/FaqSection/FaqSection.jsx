import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useAfterLoad } from '../../hooks/useAfterLoad';

import FaqItem from './FaqItem';

import styles from './FaqSection.module.scss';

export default function FaqSection() {
  const locale = getValidLocale();
  const [openedId, setOpenedId] = useState(null);
  const pageLoaded = useAfterLoad();

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
    enabled: pageLoaded,
  });

  // ---- LOADING ----
  if (!pageLoaded || isLoading) {
    return (
      <section id="faq" className={styles.section}>
        <div className="container">
          <div className={styles.content}>
            <div className={clsx(styles.loadingTitle, 'loading')} />
            <div className={styles.grid}>
              {[0, 1].map(col => (
                <ul key={col} className={styles.column}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li
                      key={i}
                      className={clsx(styles.loadingItem, 'loading')}
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

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) return null;

  // ---- SPLIT DATA ----
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
