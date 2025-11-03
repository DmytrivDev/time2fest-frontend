import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';
import { CircleFlag } from 'react-circle-flags';
import * as FaIcons from 'react-icons/fa6';
import styles from './AmbassadorDetail.module.scss';

const AmbassadorDetail = ({ data, isLoading, error, isProfilePage }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ---- Визначення ширини екрана ----
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 868);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---- LOADING стан ----
  if (isLoading) {
    return (
      <section className={clsx(styles.section, isProfilePage && styles.profilePage)}>
        <div className="container">
          <div className={clsx(styles.content, { [styles.mobile]: isMobile })}>
            {/* --- Десктопний лоадінг --- */}
            {!isMobile ? (
              <>
                <div className={clsx(styles.photoWrap, 'loading')}>
                  <div className={styles.photoInner}></div>
                </div>

                <div className={styles.info}>
                  <div className={styles.info__part}>
                    <div className={styles.info__top}>
                      <span
                        className={clsx(styles.tz, styles.tzLoading, 'loading')}
                      ></span>
                      <div className={clsx(styles.flagLoading, styles.flag)}>
                        <div className={clsx(styles.fl, 'loading')}></div>
                        <span className="loading"></span>
                      </div>
                    </div>

                    <h1
                      className={clsx(
                        styles.name,
                        styles.nameLoading,
                        'loading'
                      )}
                    ></h1>

                    <p
                      className={clsx(
                        styles.langs,
                        styles.langsLoading,
                        'loading'
                      )}
                    ></p>

                    <div className={clsx(styles.desc, styles.descLoading)}>
                      <span className="loading"></span>
                      <span className="loading"></span>
                      <span className="loading"></span>
                      <span className="loading"></span>
                    </div>
                  </div>

                  <div className={styles.socials}>
                    <p
                      className={clsx(
                        styles.follow,
                        styles.followLoading,
                        'loading'
                      )}
                    ></p>
                    <div className={styles.icons}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={clsx(
                            styles.iconLink,
                            styles.iconLinkLoading,
                            'loading'
                          )}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* --- Мобільний лоадінг --- */
              <>
                <div className={styles.info}>
                  <div className={styles.info__part}>
                    <div className={styles.info__top}>
                      <span
                        className={clsx(styles.tz, styles.tzLoading, 'loading')}
                      ></span>
                      <div className={clsx(styles.flagLoading, styles.flag)}>
                        <div className={clsx(styles.fl, 'loading')}></div>
                        <span className="loading"></span>
                      </div>
                    </div>

                    <h1
                      className={clsx(
                        styles.name,
                        styles.nameLoading,
                        'loading'
                      )}
                    ></h1>

                    <p
                      className={clsx(
                        styles.langs,
                        styles.langsLoading,
                        'loading'
                      )}
                    ></p>
                  </div>
                </div>

                <div className={clsx(styles.photoWrap, 'loading')}>
                  <div className={styles.photoInner}></div>
                </div>

                <div className={clsx(styles.desc, styles.descLoading)}>
                  <span className="loading"></span>
                  <span className="loading"></span>
                  <span className="loading"></span>
                  <span className="loading"></span>
                </div>

                <div className={styles.socials}>
                  <p
                    className={clsx(
                      styles.follow,
                      styles.followLoading,
                      'loading'
                    )}
                  ></p>
                  <div className={styles.icons}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={clsx(
                          styles.iconLink,
                          styles.iconLinkLoading,
                          'loading'
                        )}
                      ></div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ---- Якщо помилка ----
  if (error || !data) return null;

  // ---- Дані ----
  const {
    name,
    fullDescription,
    country,
    timeZone,
    languages,
    photo,
    video,
    socialLinks,
  } = data;

  const photoUrl = `${import.meta.env.VITE_STRIPE_URL}${photo}`;
  const videoUrl = video ? `${import.meta.env.VITE_STRIPE_URL}${video}` : null;

  // ---- Рендер блоків ----
  const renderPhotoBlock = () => (
    <div className={styles.photoWrap}>
      <div className={styles.photoInner}>
        {!isPlaying ? (
          <button onClick={() => setIsPlaying(true)}>
            <img src={photoUrl} alt={name} />
            {videoUrl && (
              <span className={styles.playBtn}>
                <span>{t('ambassadors.intro')}</span>
                <span className={styles.playIcon}></span>
              </span>
            )}
          </button>
        ) : (
          <div className={styles.videoWrap}>
            <video
              src={
                videoUrl.startsWith('http')
                  ? videoUrl
                  : `${import.meta.env.VITE_STRIPE_URL}${videoUrl}`
              }
              controls
              autoPlay
              playsInline
              onEnded={() => setIsPlaying(false)}
              onError={e => console.error('❌ Video error:', e)}
            ></video>
          </div>
        )}
      </div>
    </div>
  );

  const renderSocialsBlock = () =>
    socialLinks?.length > 0 && (
      <div className={styles.socials}>
        <p className={styles.follow}>{t('ambassadors.follow')}:</p>
        <div className={styles.icons}>
          {socialLinks.map((link, index) => {
            const iconName = 'Fa' + link.name;
            const Icon = FaIcons[iconName];
            const FallbackIcon = FaIcons.FaGlobe;
            return (
              <a
                key={`${link.name}-${index}`}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className={styles.iconLink}
              >
                {Icon ? <Icon size={20} /> : <FallbackIcon size={20} />}
              </a>
            );
          })}
        </div>
      </div>
    );

  const renderDescription = () =>
    fullDescription && (
      <div className={styles.desc}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {fullDescription}
        </ReactMarkdown>
      </div>
    );

  // ---- Основний рендер ----
  return (
    <section className={clsx(styles.section, isProfilePage && styles.profilePage)}>
      <div className="container">
        <div className={clsx(styles.content, { [styles.mobile]: isMobile })}>
          {/* ---- Десктопна структура ---- */}
          {!isMobile ? (
            <>
              {renderPhotoBlock()}

              <div className={styles.info}>
                <div className={styles.info__part}>
                  <div className={styles.info__top}>
                    <span className={styles.tz}>{timeZone}</span>
                    {country?.code && (
                      <div className={styles.flag}>
                        <CircleFlag
                          countryCode={country.code.toLowerCase()}
                          height="20"
                        />
                        <span>{country.name}</span>
                      </div>
                    )}
                  </div>

                  <h1 className={styles.name}>{name}</h1>

                  {languages && (
                    <p className={styles.langs}>
                      {t('ambassadors.langs')}: {languages}
                    </p>
                  )}

                  {renderDescription()}
                </div>

                {renderSocialsBlock()}
              </div>
            </>
          ) : (
            /* ---- Мобільна структура ---- */
            <>
              <div className={styles.info}>
                <div className={styles.info__part}>
                  <div className={styles.info__top}>
                    <span className={styles.tz}>{timeZone}</span>
                    {country?.code && (
                      <div className={styles.flag}>
                        <CircleFlag
                          countryCode={country.code.toLowerCase()}
                          height="20"
                        />
                        <span>{country.name}</span>
                      </div>
                    )}
                  </div>

                  <h1 className={styles.name}>{name}</h1>

                  {languages && (
                    <p className={styles.langs}>
                      {t('ambassadors.langs')}: {languages}
                    </p>
                  )}
                </div>
              </div>

              {renderPhotoBlock()}
              {renderDescription()}
              {renderSocialsBlock()}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AmbassadorDetail;
