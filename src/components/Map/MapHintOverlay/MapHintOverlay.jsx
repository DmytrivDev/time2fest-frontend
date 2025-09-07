import React, { useEffect, useState, useRef } from 'react';
import styles from './MapHintOverlay.module.scss';

export default function MapHintOverlay({ viewportRef }) {
  const [visible, setVisible] = useState(false);  // чи показувати overlay
  const [fade, setFade] = useState(false);        // стан плавного зникання
  const [animate, setAnimate] = useState(false);  // запуск анімації
  const onceRef = useRef(false);

  const isTouchDevice = () =>
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (!isTouchDevice()) return;
    if (localStorage.getItem('mapHintShown')) return;

    setVisible(true);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !onceRef.current) {
            onceRef.current = true;

            // запускаємо анімацію
            setAnimate(true);

            // і таймер на 4с для плавного зникання
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
    if (fade) return;
    setFade(true);
    localStorage.setItem('mapHintShown', '1');
    setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${fade ? styles.hidden : ''}`}>
      <div className={styles.content}>
        <div className={styles.animCont}>
          <div className={animate ? styles.play1 : ''}></div>
          <div className={animate ? styles.play2 : ''}></div>
        </div>
      </div>
    </div>
  );
}
