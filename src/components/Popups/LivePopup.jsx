import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import { useLivePopupStore } from '@/stores/useLivePopupStore';

import styles from './Popup.module.scss';

export default function LivePopup() {
  const { isOpen, playbackId, closePopup } = useLivePopupStore();
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !playbackId || !videoRef.current) return;

    const video = videoRef.current;
    const streamUrl = `https://stream.mux.com/${playbackId}.m3u8`;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [isOpen, playbackId]);

  if (!isOpen || !playbackId) return null;

  return (
    <div className={styles.videoOverlay} onClick={closePopup}>
      <div
        className={styles.videoModal}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={closePopup} />

        <div className={styles.videoWrap}>
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            muted
          />
        </div>
      </div>
    </div>
  );
}
