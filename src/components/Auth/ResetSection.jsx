import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { api } from '@/utils/api';
import styles from './auth.module.scss';

// --- API-запит ---
const resetPassword = async data => {
  const res = await api.post('/auth/reset-password', data);
  return res.data;
};

export default function ResetPasswordForm() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Отримуємо токен з URL ---
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // --- Мутація ---
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setShowSuccess(true);
      setServerError('');

      // ✅ Автоматична переадресація через 2 секунди
      setTimeout(() => {
        const langPrefix = i18n.language !== 'en' ? `/${i18n.language}` : '';
        navigate(`${langPrefix}/login`);
      }, 2000);
    },
    onError: err => {
      console.error('Reset error:', err);
      const msg = err?.response?.data?.message;
      clearErrors();
      setShowSuccess(false);
      setServerError('');

      if (msg === 'Invalid or expired reset token') {
        setServerError(t('auth.errorInvalidToken'));
      } else {
        toast.error(t('auth.errorServer'));
      }
    },
  });

  // --- Обробник форми ---
  const onSubmit = data => {
    clearErrors();
    setServerError('');
    setShowSuccess(false);

    if (!data.password) {
      setError('password', {
        type: 'manual',
        message: t('auth.errorPasswordRequired'),
      });
      return;
    }

    if (data.password.length < 4) {
      setError('password', {
        type: 'manual',
        message: t('auth.errorPasswordWeak'),
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t('auth.errorPasswordMismatch'),
      });
      return;
    }

    mutation.mutate({
      token,
      password: data.password,
    });
  };

  return (
    <div className={clsx(styles.section, styles.full)}>
      <div className="container">
        <div className={styles.simpleFormWrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.simpleForm}>
            <h1 className={styles.title}>{t('auth.newPasswordTitle')}</h1>

            <div className={styles.simpleLogin}>
              {showSuccess && (
                <div className={styles.infoBox}>
                  <p>{t('auth.passwordChanged')}</p>
                </div>
              )}

              {serverError && (
                <p className={clsx(styles.error, styles.infoBox)}>
                  {serverError}
                </p>
              )}

              <div className={styles.form__part}>
                <label className={styles.label}>{t('auth.newPassword')}</label>
                <input
                  type="password"
                  {...register('password')}
                  className={clsx(
                    styles.input,
                    errors.password && styles.errorInput
                  )}
                  placeholder={t('auth.passwordPlaceholder')}
                />
                {errors.password && (
                  <p className={styles.error}>
                    {errors.password.message || t('auth.errorPassword')}
                  </p>
                )}
              </div>

              <div className={styles.form__part}>
                <label className={styles.label}>
                  {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  className={clsx(
                    styles.input,
                    errors.confirmPassword && styles.errorInput
                  )}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                />
                {errors.confirmPassword && (
                  <p className={styles.error}>
                    {errors.confirmPassword.message ||
                      t('auth.errorPasswordMismatch')}
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
                {t('auth.changePassword')}
              </button>
            </div>

            <p className={styles.bottomText}>
              {t('auth.rememberedPassword')}{' '}
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
