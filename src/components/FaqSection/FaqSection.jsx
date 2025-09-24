import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useAfterLoad } from '../../hooks/useAfterLoad';

import FaqItem from './FaqItem';
import styles from './FaqSection.module.scss';

export default function FaqSection({
  loafCount = 4,
  propData = false,
  data = null,
  isLoading = true,
  error = null,
}) {
  const locale = getValidLocale();
  const [openedId, setOpenedId] = useState(null);
  const pageLoaded = useAfterLoad();

  const toggle = id => {
    setOpenedId(prev => (prev === id ? null : id));
  };

  // --- визначаємо джерело даних ---
  let finalData, finalIsLoading, finalError;

  if (!propData) {
    const query = useQuery({
      queryKey: ['faq', locale],
      queryFn: async () => {
        const res = await api.get(`/faq?locale=${locale}`);
        return res.data;
      },
      staleTime: 5 * 60 * 1000,
      enabled: pageLoaded,
    });

    finalData = query.data;
    finalIsLoading = query.isLoading || !pageLoaded;
    finalError = query.error;
  } else {
    finalData = data;
    finalIsLoading = isLoading;
    finalError = error;
  }

  // --- LOADING ---
  if (finalIsLoading) {
    return (
      <section id="faq" className={styles.section}>
        <div className="container">
          <div className={styles.content}>
            <div className={clsx(styles.loadingTitle, 'loading')} />
            <div className={styles.grid}>
              {[0, 1].map(col => (
                <ul key={col} className={styles.column}>
                  {Array.from({ length: loafCount }).map((_, i) => (
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

  if (finalError) {
    console.error(finalError);
    return null;
  }

  if (!finalData) return null;

  // --- нормалізація даних ---
  const faqList = finalData.faq || finalData.FAQList || [];
  const title = finalData.title || finalData.Title || 'FAQ';

  if (!faqList.length) return null;

  // --- SPLIT DATA на 2 колонки ---
  const half = Math.ceil(faqList.length / 2);
  const left = faqList.slice(0, half);
  const right = faqList.slice(half);

  return (
    <section id="faq" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <h2>{title}</h2>
          <div className={styles.grid}>
            {[left, right].map((column, colIdx) => (
              <ul key={colIdx} className={styles.column}>
                {column.map(item => (
                  <FaqItem
                    key={item.id}
                    id={item.id}
                    question={item.question || item.Question}
                    answer={item.answer || item.Answer}
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
