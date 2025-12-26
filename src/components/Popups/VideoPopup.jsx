import clsx from 'clsx';
import { useVideoPopupStore } from '@/stores/useVideoPopupStore';

import styles from './Popup.module.scss';

export default function VideoPopup() {
  const { isOpen, videoId, closePopup } = useVideoPopupStore();

  if (!isOpen || !videoId) return null;

  return (
    <div className={styles.videoOverlay} onClick={closePopup}>
      <div
        className={styles.videoModal}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={closePopup} />

        <div className={styles.videoWrap}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube live"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
