import clsx from 'clsx';
import styles from './AboutWay.module.scss';

const AboutWay = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <section
        id="about-way"
        className={clsx(styles.section, styles.sectionLoading)}
      >
        <div className="container">
          <div className={styles.content}>
            {/* Ліва частина */}
            <div className={styles.left}>
              <div
                className={clsx(styles.loadingTitle, styles.title, 'loading')}
              />
              <div className={clsx(styles.loadingText, styles.text)}>
                <span className="loading"></span>
                <span className="loading"></span>
              </div>
              <div className={styles.actions}>
                <div
                  className={clsx(styles.loadingBtn, 'btn_primary loading')}
                />
              </div>
            </div>

            {/* Права частина */}
            <div className={styles.right}>
              <ul className={styles.list}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <li
                    key={i}
                    className={clsx(styles.loadingItem, styles.item, 'loading')}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) return null;

  return (
    <section id="about-way" className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          {/* Ліва частина */}
          <div className={styles.left}>
            {data.Title && <h2 className={styles.title}>{data.Title}</h2>}
            {data.Text && <p className={styles.text}>{data.Text}</p>}

            {data.ButtonText && data.ButtonLink && (
              <div className={styles.actions}>
                <a
                  href={data.ButtonLink}
                  target={data.ButtonTarget ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="btn_primary"
                >
                  {data.ButtonText}
                </a>
              </div>
            )}
          </div>

          {/* Права частина */}
          <div className={styles.right}>
            <ul className={styles.list}>
              {data.WayList?.map(item => (
                <li key={item.id} className={styles.item}>
                  {item.Item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWay;
