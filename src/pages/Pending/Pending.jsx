import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CirclesWithBar } from 'react-loader-spinner';

import { userApi } from '@/utils/userApi';
import { getValidLocale } from '@/utils/getValidLocale';

import styles from './Pending.module.scss';

const PendingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const locale = getValidLocale(i18n.language);
  const prefix = locale !== 'en' ? `/${locale}` : '';

  /**
   * =========================
   * AUTH (polling)
   * =========================
   */
  const { data: user, error: authError } = useQuery({
    queryKey: ['authUserPending'],
    queryFn: async () => {
      const res = await userApi.get('/auth/me');
      return res.data;
    },
    refetchInterval: 3000,
    retry: false,
  });

  /**
   * =========================
   * PAYMENTS (polling)
   * =========================
   */
  const { data: orders = [], isFetched: ordersFetched } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: async () => {
      const res = await userApi.get('/orders');
      return res.data || [];
    },
    enabled: !!user,
    refetchInterval: 3000,
    retry: false,
  });

  /**
   * =========================
   * REDIRECT LOGIC
   * =========================
   */
  useEffect(() => {
    // ❌ не авторизований
    if (authError) {
      navigate(prefix || '/');
      return;
    }

    if (!user || !ordersFetched) return;

    // ✅ premium → success (ЗАВЖДИ)
    if (user.isPremium) {
      navigate(`${prefix}/profile/success`);
      return;
    }

    // ⏳ є pending → залишаємо на цій сторінці
    const hasPending = orders.some(o => o.status === 'pending');
    if (hasPending) return;

    // 🚫 немає pending і не premium
    navigate(`${prefix}/profile/subscription`);
  }, [user, orders, ordersFetched, authError, navigate, prefix]);

  /**
   * =========================
   * UI
   * =========================
   */
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.card}>
          <CirclesWithBar
            height="100"
            width="100"
            color="#f94a51"
            outerCircleColor="#f94a51"
            innerCircleColor="#f94a51"
            barColor="#fce286"
            visible
          />

          <h1 className={styles.title}>{t('payment.pending_title')}</h1>

          <p className={styles.text}>{t('payment.pending_text')}</p>

          <p className={styles.subtext}>{t('payment.pending_subtext')}</p>

          <p className={styles.note}>{t('payment.pending_note')}</p>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
