import React from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';

import { useLivePopupStore } from '@/stores/useLivePopupStore';

import styles from './CountryLiveList.module.scss';

const CountryLiveList = ({
  data,
  dataItems,
  isLoading,
  error,
  isProfilePage,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const openPopup = useLivePopupStore(state => state.openPopup);

  //
  // ================= LOADING =================
  //
  if (isLoading) {
    return (
      <section
        className={clsx(styles.section, isProfilePage && styles.profilePage)}
      >
        <div className="container">
          <div className={styles.header}>
            <div
              className={clsx(styles.title, styles.titleLoading, 'loading')}
            />
          </div>

          <ul className={styles.videoList}>
            {Array.from({ length: 2 }).map((_, i) => (
              <li
                key={i}
                className={clsx(
                  styles.videoItem,
                  styles.videoItemLoad,
                  'loading'
                )}
              />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  //
  // ================= EMPTY / ERROR =================
  //
  if (
    error ||
    !Array.isArray(dataItems) ||
    dataItems.length === 0 ||
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return null;
  }

  //
  // ================= DATA =================
  //
  const country = data[0];
  const countryCode = country.CountryCode?.toLowerCase();

  //
  // ================= HELPERS =================
  //
  const getTitle = item =>
    item.title?.[lang] || item.title?.en || item.title?.uk || '';

  const getPlaybackId = item => {
    if (item.trstatus === 'process') return item.live_playback_id;
    if (item.trstatus === 'end') return item.mux_playback_id;
    return null;
  };

  //
  // ================= HANDLERS =================
  //
  const handleVideoClick = item => {
    const playbackId = getPlaybackId(item);
    if (!playbackId) return;

    openPopup({
      playbackId,
      trstatus: item.trstatus,
      documentId: item.documentId,
    });
  };

  //
  // ================= RENDER =================
  //
  return (
    <section
      className={clsx(styles.section, isProfilePage && styles.profilePage)}
    >
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('video.videosLivr')}</h2>
        </div>

        <ul className={styles.videoList}>
          {dataItems.map(item => {
            const isPrestart = item.trstatus === 'prestart';
            const isLive = item.trstatus === 'process';
            const isReplay = item.trstatus === 'end';

            return (
              <li key={item.documentId} className={styles.videoItem}>
                <div className={styles.videoItemLeft}>
                  {countryCode && (
                    <CircleFlag countryCode={countryCode} height="20" />
                  )}

                  <h3 className={styles.name}>{getTitle(item)}</h3>
                </div>

                {isPrestart && (
                  <span className={clsx(styles.button, styles.disabled, 'btn_primary', 'video')}>
                    {t('video.waitLive')}
                  </span>
                )}

                {(isLive || isReplay) && (
                  <button
                    className={clsx(styles.button, 'btn_primary', 'video')}
                    onClick={() => handleVideoClick(item)}
                  >
                    {isLive ? t('video.watchLive') : t('video.watchReplay')}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default React.memo(CountryLiveList);
