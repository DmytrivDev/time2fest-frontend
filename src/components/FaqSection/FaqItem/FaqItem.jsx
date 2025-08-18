import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './FaqItem.module.scss';

export default function FaqItem({ id, question, answer, isOpen, onToggle }) {
  const ref = useRef(null);
  const [height, setHeight] = useState('0px');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ref.current) {
      if (isOpen) {
        setHeight(`${ref.current.scrollHeight}px`);
        setVisible(true);
      } else {
        setHeight('0px');
        setTimeout(() => setVisible(false), 300);
      }
    }
  }, [isOpen]);

  return (
    <li className={clsx(styles.item, isOpen && styles.opened)}>
      <button className={styles.toggle} onClick={onToggle}>
        <span>{question}</span>
        <span className={styles.icon}></span>
      </button>
      <div
        ref={ref}
        className={styles.answer}
        style={{
          maxHeight: height,
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
          overflow: 'hidden',
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <p>{answer}</p>
      </div>
    </li>
  );
}