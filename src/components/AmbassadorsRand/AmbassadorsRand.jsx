import React from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { api } from '@/utils/api';
import AmbassadorItem from '../common/AmbassadorItem';
import styles from './AmbassadorsRand.module.scss';

const AmbassadorsRand = React.memo(({ exclude, lang }) => {
  const { t, i18n } = useTranslation();
  const locale = lang || i18n.language || 'en';

  const { data, isLoading, error } = useQuery({
    queryKey: ['ambassadors-random', locale, exclude],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('locale', locale);
      params.set('rand', 'true');
      params.set('count', '4');

      // ---- правильне виключення ----
      if (exclude) {
        if (Array.isArray(exclude)) {
          exclude.forEach(id => params.append('filters[id][$ne]', id));
        } else {
          params.set('filters[id][$ne]', exclude);
        }
      }

      const res = await api.get(`/ambassadors-list?${params.toString()}`);
      // підтримка формату Strapi і прямого масиву
      const data = Array.isArray(res.data.items) ? res.data.items : res.data?.data.items || [];

      return data;
    },
  });

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <div
              className={clsx(styles.title, styles.titleLoading, 'loading')}
            ></div>
            <div
              className={clsx(
                styles.buttonLoading,
                'btn_primary',
                'btn_small',
                'loading'
              )}
            ></div>
          </div>
          <div className={styles.content}>
            <div className={styles.grid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <AmbassadorItem key={i} isLoading />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.length) return null;

  // ---- фронтова перевірка, якщо бекенд не відфільтрував ----
  const filteredData = exclude
    ? data.filter(amb =>
        Array.isArray(exclude)
          ? !exclude.includes(amb.id)
          : amb.id !== Number(exclude)
      )
    : data;

  if (!filteredData.length) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t('ambassadors.rand_title')}</h2>
          <Link
            to={`/${i18n.language !== 'en' ? i18n.language + '/' : ''}ambassadors/list`}
            className="btn_primary btn_small"
          >
            {t('ambassadors.all_ambass')}
          </Link>
        </div>

        <div className={styles.content}>
          <div className={styles.grid}>
            {filteredData.map(amb => (
              <AmbassadorItem key={amb.id} data={amb} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default AmbassadorsRand;
