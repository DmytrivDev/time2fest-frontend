import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { api } from '@/utils/api';
import styles from './auth.module.scss';

// --- API запит ---
const sendResetLink = async data => {
  const res = await api.post('/auth/forgot-password', data);
  return res.data;
};

export default function ResetPasswordRequest() {
  const { t, i18n } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: sendResetLink,
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: err => {
      console.error('Reset request error:', err);
      const msg = err?.response?.data?.message;

      clearErrors();
      setShowSuccess(false);

      if (msg === 'User not found') {
        setError('email', {
          type: 'manual',
          message: t('auth.errorEmailNotFound'),
        });
      } else if (Array.isArray(msg)) {
        toast.error(msg.join(', '));
      } else {
        toast.error(t('auth.errorServer'));
      }
    },
  });

  const onSubmit = data => {
    setShowSuccess(false);
    mutation.mutate({
      email: data.email,
      locale: i18n.language, // ✅ передаємо мову бекенду
    });
  };

  return (
    <div className={clsx(styles.section, styles.full)}>
      <div className="container">
        <div className={styles.simpleFormWrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.simpleForm}>
            <h1 className={styles.title}>{t('auth.resetTitle')}</h1>

            <div className={styles.simpleLogin}>
              {showSuccess && (
                <div className={styles.infoBox}>
                  <p>{t('auth.resetEmailSent')}</p>
                </div>
              )}

              <div className={styles.form__part}>
                <label className={styles.label}>{t('auth.email')}</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className={clsx(
                    styles.input,
                    errors.email && styles.errorInput
                  )}
                  placeholder={t('auth.emailPlaceholder')}
                />
                {errors.email && (
                  <p className={styles.error}>
                    {errors.email.message || t('auth.errorEmail')}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className={clsx(
                  'btn_primary',
                  styles.submitBtn,
                  styles.ResetBtn,
                  mutation.isPending && styles.load
                )}
              >
                <span></span>
                {t('auth.sendResetLink')}
              </button>
            </div>

            <p className={clsx(styles.bottomText)}>
              <Link
                to={`/${
                  i18n.language !== 'en' ? i18n.language + '/login' : 'login'
                }`}
              >
                {t('auth.backToLogin')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
