import React, { useMemo } from 'react';
import clsx from 'clsx';
import { CircleFlag } from 'react-circle-flags';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks/useAuth';
import { useLoginPopupStore } from '@/stores/useLoginPopupStore';
import { useSubPopupStore } from '@/stores/useSubPopupStore';

import styles from './CountryVideoList.module.scss';

const CountryVideoList = ({
  data,
  dataItems,
  isLoading,
  error,
  isProfilePage,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const { isAuthenticated, isPremium } = useAuth();
  const openLoginPopup = useLoginPopupStore(s => s.openPopup);
  const openSubPopup = useSubPopupStore(s => s.openPopup);

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
              <li key={i} className={styles.videoItem}>
                <div className={styles.videoItemLeft}>
                  <div className={clsx(styles.flagLoading, 'loading')} />
                  <div className={clsx(styles.nameLoading, 'loading')} />
                </div>
                <div className={clsx(styles.buttonLoading, 'loading')} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  //
  // ================= EMPTY / ERROR =================
  //
  if (error || !dataItems?.length || !data?.[0]) return null;

  //
  // ================= DATA =================
  //
  const country = data[0];
  const countryCode = country.CountryCode?.toLowerCase();

  const getNameByLang = item =>
    item[`name_${lang}`] || item.name_en || item.name_uk || '';

  //
  // ================= HANDLERS =================
  //
  const handleVideoClick = videoId => {
    if (!isAuthenticated) {
      openLoginPopup();
      return;
    }

    if (!isPremium) {
      openSubPopup();
      return;
    }

    // 👇 тут пізніше буде відкриття модалки / плеєра
    console.log('▶️ Play video:', videoId);
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
          <h2 className={styles.title}>{t('video.videos')}</h2>
        </div>

        <ul className={styles.videoList}>
          {dataItems.map(item => (
            <li key={item.id} className={styles.videoItem}>
              <div className={styles.videoItemLeft}>
                {countryCode && (
                  <CircleFlag countryCode={countryCode} height="20" />
                )}

                <h3 className={styles.name}>{getNameByLang(item)}</h3>
              </div>

              <button
                className={clsx(styles.button, 'btn_primary', 'video')}
                onClick={() => handleVideoClick(item.videoId)}
              >
                {t('video.seevideo')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default React.memo(CountryVideoList);
