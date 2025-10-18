import React from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const delta = 3; // 🔧 кількість сторінок у кожен бік від поточної
  const visiblePages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      visiblePages.push(i);
    } else if (
      (i === currentPage - (delta + 1) && currentPage > delta + 2) ||
      (i === currentPage + (delta + 1) &&
        currentPage < totalPages - (delta + 1))
    ) {
      visiblePages.push('...');
    }
  }

  const handleClick = (e, p) => {
    e.preventDefault();
    if (p !== currentPage && typeof p === 'number') {
      onChange(p);
    }
  };

  const buildHref = pageNum => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNum);
    return url.pathname + url.search;
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination Navigation">
      {/* --- Попередня сторінка --- */}
      <a
        href={currentPage > 1 ? buildHref(currentPage - 1) : '#'}
        rel="prev"
        className={clsx(styles.pageBtn, currentPage === 1 && styles.disabled)}
        onClick={e => handleClick(e, currentPage - 1)}
        aria-disabled={currentPage === 1}
      >
        &lt;
      </a>

      {/* --- Сторінки --- */}
      {visiblePages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <a
            key={`page-${p}`}
            href={buildHref(p)}
            rel={
              p === currentPage - 1
                ? 'prev'
                : p === currentPage + 1
                  ? 'next'
                  : undefined
            }
            className={clsx(styles.pageBtn, p === currentPage && styles.active)}
            onClick={e => handleClick(e, p)}
          >
            {p}
          </a>
        )
      )}

      {/* --- Наступна сторінка --- */}
      <a
        href={currentPage < totalPages ? buildHref(currentPage + 1) : '#'}
        rel="next"
        className={clsx(
          styles.pageBtn,
          currentPage === totalPages && styles.disabled
        )}
        onClick={e => handleClick(e, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
      >
        &gt;
      </a>
    </nav>
  );
};

export default Pagination;
