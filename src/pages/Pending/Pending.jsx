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
   * AUTH
   * =========================
   */
  const {
    data: user,
    isLoading: authLoading,
    isError: authError,
  } = useQuery({
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
   * ORDERS
   * =========================
   */
  const {
    data: orders = [],
    isLoading: ordersLoading,
    isFetched: ordersFetched,
  } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: async () => {
      const res = await userApi.get('/orders');
      return res.data || [];
    },
    refetchInterval: 3000,
    retry: false,
  });

  /**
   * =========================
   * REDIRECT LOGIC
   * =========================
   */
  useEffect(() => {
    // ⏳ чекаємо стабілізації
    if (authLoading || ordersLoading) return;

    // ❌ не авторизований (refresh не врятував)
    if (authError || !user) {
      navigate(prefix || '/');
      return;
    }

    // ✅ premium — фінал
    if (user.isPremium) {
      navigate(`${prefix}/profile/success`);
      return;
    }

    if (!ordersFetched) return;

    // ⏳ є хоча б одне замовлення → чекаємо IPN
    if (orders.length > 0) {
      return;
    }

    // 🚫 нічого не починали
    navigate(`${prefix}/profile/subscription`);
  }, [
    authLoading,
    ordersLoading,
    authError,
    user,
    orders,
    ordersFetched,
    navigate,
    prefix,
  ]);

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
