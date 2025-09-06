import React, { useEffect, useState, useRef } from 'react';
import styles from './MapHintOverlay.module.scss';

export default function MapHintOverlay({ viewportRef }) {
  const [visible, setVisible] = useState(false);  // чи показувати overlay
  const [fade, setFade] = useState(false);        // стан плавного зникання
  const onceRef = useRef(false);

  // визначаємо сенсорні пристрої
  const isTouchDevice = () =>
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // показуємо оверлей одразу після завантаження
  useEffect(() => {
    if (!isTouchDevice()) return;
    if (localStorage.getItem('mapHintShown')) return;

    setVisible(true); // показуємо overlay одразу

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !onceRef.current) {
            onceRef.current = true;

            // запускаємо таймер на 4с
            const timer = setTimeout(() => {
              startFadeOut();
            }, 4000);

            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }

    return () => observer.disconnect();
  }, [viewportRef]);

  // слухаємо pinch/zoom двома пальцями
  useEffect(() => {
    if (!visible) return;

    const handler = e => {
      if (e.touches && e.touches.length >= 2) {
        startFadeOut();
      }
    };

    const node = viewportRef.current;
    if (node) {
      node.addEventListener('touchstart', handler, { passive: true });
    }

    return () => {
      if (node) {
        node.removeEventListener('touchstart', handler);
      }
    };
  }, [visible, viewportRef]);

  const startFadeOut = () => {
    if (fade) return; // вже зникає
    setFade(true);
    localStorage.setItem('mapHintShown', '1');
    setTimeout(() => setVisible(false), 500); // після анімації повністю прибрати
  };

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${fade ? styles.hidden : ''}`}>
      <div className={styles.content}>
        {/* 👉 Дизайнер вставляє свою анімацію */}
        <img src="/hero/resizer.gif" alt="Use two fingers" />
      </div>
    </div>
  );
}
