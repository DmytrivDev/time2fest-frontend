import React from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from './TextPage.module.scss';

const TextPage = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.heading}>
              <div className={clsx(styles.titleLoading, 'loading')}></div>
            </div>
            <div className={clsx(styles.embedCont, styles.embedLoading)}>
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="loading"></span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.heading}>
            {data.Title && <h1 className={styles.text}>{data.Title}</h1>}
          </div>

          {data.Text && (
            <div className={clsx(styles.embedCont, 'embed')}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.Text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextPage;
