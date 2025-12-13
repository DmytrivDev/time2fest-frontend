import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLoginSubPopupStore } from '@/stores/useLoginSubPopupStore';
import { useAuth } from '@/hooks/useAuth'; 

import styles from './AboutPaid.module.scss';

const AboutPaid = ({ data, dataFree, isLoading, error }) => {
  const { t, i18n } = useTranslation('common');
  const openLoginPopup = useLoginSubPopupStore(s => s.openPopup);
  const { isAuthenticated } = useAuth();

  const lang = i18n.language === 'en' ? '' : `${i18n.language}/`;

  if (isLoading) {
    return (
      <section
        id="about-paid"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            {/* header */}
            <div className={styles.header}>
              <div className={styles.headerTop}>
                <div
                  className={clsx(styles.loadingTitle, styles.title, 'loading')}
                />
                <div
                  className={clsx(styles.loadingPrice, styles.price, 'loading')}
                />
              </div>
              <div className={clsx(styles.loadingText, styles.text)}>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
            </div>

            {/* cards */}
            <ul className={styles.cards}>
              {Array.from({ length: 3 }).map((_, i) => (
                <li
                  key={i}
                  className={clsx(styles.card, styles.loadingCard, 'loading')}
                ></li>
              ))}

              {/* last card with subcards */}
              <li className={clsx(styles.card, styles.cardLast)}>
                <div className={clsx(styles.imageWrapper)} />
                <ul className={styles.subCards}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li
                      key={i}
                      className={clsx(
                        styles.subCard,
                        styles.loadingSubcard,
                        'loading'
                      )}
                    />
                  ))}
                </ul>
              </li>
            </ul>

            {/* actions */}
            <div className={styles.actions}>
              <div className={clsx(styles.loadingBtn, 'btn_primary loading')} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;
  const count = data.PaidPlanList.length;

  return (
    <section id="about-paid" className={styles.section}>
      <div className={styles.bg}>
        <img src="/aboutPage/paid_bg.jpg" className={styles.dec} alt="" />
      </div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
              {data.Price && <span className={styles.price}>{data.Price}</span>}
            </div>
            {data.Text && <p className={styles.text}>{data.Text}</p>}
          </div>

          <ul className={clsx(styles.cards, count === 1 && styles.oneItem)}>
            {data.PaidPlanList?.map(item => {
              return (
                <li key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {item.Image?.url && (
                      <img
                        src={`${import.meta.env.VITE_STRIPE_URL}${item.Image.url}`}
                        alt={item.Image?.alternativeText || item.Text}
                      />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.cardText}>{item.Text}</p>
                  </div>
                </li>
              );
            })}
            {dataFree?.FreePlanList && (
              <li className={clsx(styles.card, styles.cardLast)}>
                <img src="/aboutPage/free.png" className={styles.dec} alt="" />
                <ul className={styles.subCards}>
                  {dataFree.FreePlanList.map(free => (
                    <li key={free.id} className={styles.subCard}>
                      <img
                        src={`${import.meta.env.VITE_STRIPE_URL}${free.Image.url}`}
                        alt={free.Image?.alternativeText || free.Text}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
          <div className={styles.actions}>
            {!isAuthenticated ? (
              <button className="btn_primary" onClick={openLoginPopup}>
                {t('btn_sub')}
              </button>
            ) : (
              <Link to={`/${lang}/profile/subscription`} className="btn_primary">
                {t('btn_sub')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPaid;
