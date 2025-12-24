import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { getValidLocale } from '@/utils/getValidLocale';
import { userApi } from '@/utils/userApi';

import clsx from 'clsx';
import styles from './ProfilePayments.module.scss';

export default function ProfilePayments() {
  const { t, i18n } = useTranslation();
  const locale = getValidLocale(i18n.language);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile-orders'],
    queryFn: async () => {
      const res = await userApi.get('/orders');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className={styles.profileContent}>
        <div className={styles.heading}>
          <div className={clsx(styles.titleLoading, 'loading')}></div>
        </div>
        <div className={styles.payments}>
          <div>
            <div className={styles.payment__heading}>
              <div className={styles.coll}>{t('profile.payC1')}</div>
              <div className={styles.coll}>{t('profile.payC2')}</div>
              <div className={styles.coll}>{t('profile.payC3')}</div>
              <div className={styles.coll}>{t('profile.payC4')}</div>
              <div className={styles.coll}>{t('profile.payC5')}</div>
              <div className={styles.coll}>{t('profile.payC6')}</div>
              <div className={styles.coll}>{t('profile.payC7')}</div>
            </div>

            <ul className={styles.payments__list}>
              <li className={clsx(styles.payments__item, styles.payItemLoading, 'loading')}></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (error || !orders) return null;

  return (
    <div className={styles.profileContent}>
      <div className={styles.heading}>
        <div>
          <h1>{t('profile.payTtl')}</h1>
        </div>
      </div>

      <div className={styles.payments}>
        <div>
          <div className={styles.payment__heading}>
            <div className={styles.coll}>{t('profile.payC1')}</div>
            <div className={styles.coll}>{t('profile.payC2')}</div>
            <div className={styles.coll}>{t('profile.payC3')}</div>
            <div className={styles.coll}>{t('profile.payC4')}</div>
            <div className={styles.coll}>{t('profile.payC5')}</div>
            <div className={styles.coll}>{t('profile.payC6')}</div>
            <div className={styles.coll}>{t('profile.payC7')}</div>
          </div>

          <ul className={styles.payments__list}>
            {orders.length === 0 && (
              <li className={clsx(styles.payments__item, styles.payments__itemno)}>
                <div>{t('profile.payEmpty')}</div>
              </li>
            )}

            {orders.map(order => (
              <li key={order.id} className={styles.payments__item}>
                <div className={styles.coll}>
                  <div>{t('profile.payC1')}</div>
                  <div>{order.id}</div>
                </div>

                <div className={styles.coll}>
                  <div>{t('profile.payC2')}</div>
                  <div>{order.order_id || '—'}</div>
                </div>

                <div className={styles.coll}>
                  <div>{t('profile.payC3')}</div>
                  <div>{t('profile.payTypeSub')}</div>
                </div>

                <div className={styles.coll}>
                  <div>{t('profile.payC4')}</div>
                  <div>{t('profile.payProdNY')}</div>
                </div>

                <div className={styles.coll}>
                  <div>{t('profile.payC5')}</div>
                  <div>
                    {new Date(order.created_at).toLocaleDateString(locale)}
                  </div>
                </div>

                <div className={styles.coll}>
                  <div>{t('profile.payC6')}</div>
                  <div>$5</div>
                </div>

                <div className={styles.coll}>
                  {order.invoice_link ? (
                    <a
                      href={order.invoice_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{t('profile.payC7')}</span>
                    </a>
                  ) : (
                    <span>—</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
