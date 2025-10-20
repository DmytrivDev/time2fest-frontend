import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 868);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 868);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔹 Визначаємо діапазон сторінок
  const delta = isMobile ? 1 : 3;
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
    if (typeof p === 'number' && p !== currentPage) {
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
        className={clsx(
          styles.pageBtn,
          styles.arrow,
          styles.prev,
          currentPage === 1 && styles.disabled
        )}
        onClick={e => {
          if (currentPage === 1) e.preventDefault();
          else handleClick(e, currentPage - 1);
        }}
        aria-disabled={currentPage === 1}
      >
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
          styles.arrow,
          styles.next,
          currentPage === totalPages && styles.disabled
        )}
        onClick={e => {
          if (currentPage === totalPages) e.preventDefault();
          else handleClick(e, currentPage + 1);
        }}
        aria-disabled={currentPage === totalPages}
      >
      </a>
    </nav>
  );
};

export default Pagination;
