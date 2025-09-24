import { useEffect } from 'react';

export default function useFloatingDecors(selector = '.dec', amplitude = 20) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // нормалізовані координати від -1 до 1
      const offsetX = ((e.clientX - centerX) / centerX) * amplitude;
      const offsetY = ((e.clientY - centerY) / centerY) * amplitude;

      elements.forEach((el, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        // забираємо поточний transform (наприклад rotate)
        const baseTransform = el.dataset.baseTransform || window.getComputedStyle(el).transform;


        // якщо transform був none → базовий трансформ порожній
        const base = baseTransform === 'none' ? '' : baseTransform;

        // додаємо translate
        el.style.transform = `${base} translate3d(${offsetX * direction}px, ${offsetY * direction}px, 0)`;

        // зберігаємо "базовий" transform (щоб не втратити rotate)
        if (!el.dataset.baseTransform) {
          el.dataset.baseTransform = base;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [selector, amplitude]);
}