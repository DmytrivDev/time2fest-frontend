import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './FaqItem.module.scss';

const FaqItem = ({ id, question, answer, isOpen, onToggle }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (!ref.current) return;

    if (isOpen) {
      // плавно відкриваємо
      setHeight(`${ref.current.scrollHeight}px`);
    } else {
      // закриваємо
      setHeight('0px');
    }
  }, [isOpen]);

  return (
    <li className={clsx(styles.item, isOpen && styles.opened)}>
      <div className={styles.toggle} onClick={onToggle}>
        <h4>{question}</h4>
        <button
          type="button"
          className={clsx(styles.icon, isOpen && styles.rotated)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
        />
      </div>

      <div
        id={`faq-answer-${id}`}
        ref={ref}
        className={styles.answer}
        style={{
          maxHeight: height,
          transition: 'max-height 0.4s ease',
          overflow: 'hidden',
        }}
      >
        <p>{answer}</p>
      </div>
    </li>
  );
};

export default FaqItem;
