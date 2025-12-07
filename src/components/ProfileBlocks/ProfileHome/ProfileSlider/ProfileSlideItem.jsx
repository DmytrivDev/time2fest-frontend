import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './ProfileSlider.module.scss';

export default function ProfileSlideItem({ item }) {
  if (!item) return null;

  const { Title, Text, ButtonText, ButtonLink, Image } = item;

  // Витягуємо зображення
  const imgSrc =
    Image?.url ||
    Image?.formats?.medium?.url ||
    Image?.formats?.large?.url ||
    '/temp/slide.jpg';

  return (
    <div className={styles.slide}>
      <div className={clsx(styles.slideEmg)}>
        <img
          src={`${import.meta.env.VITE_STRIPE_URL}${imgSrc}`}
          alt={Image?.alternativeText || Title || ''}
          width={Image?.width || 1024}
          height={Image?.height || 400}
        />
      </div>

      <div className={styles.slide__cont}>
        {Title && <h2 className={styles.slideTtl}>{Title}</h2>}

        {Text && (
          <div className={styles.slideText}>
            <p>{Text}</p>
          </div>
        )}

        {ButtonText && ButtonLink && (
          <Link
            to={ButtonLink}
            className={clsx(styles.slideBtn, 'btn_primary')}
          >
            {ButtonText}
          </Link>
        )}
      </div>
    </div>
  );
}
