import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '@/utils/api';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import styles from './auth.module.scss';

const loginUser = async data => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  // --- Google Login ---
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async tokenResponse => {
      try {
        const res = await api.post('/auth/google', {
          code: tokenResponse.code,
        });

        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.data));

        navigate(
          `/${i18n.language !== 'en' ? i18n.language + '/profile' : 'profile'}`
        );
      } catch (err) {
        console.error('Google login error:', err);
        toast.error(t('auth.errorGoogle'));
      }
    },
    onError: error => {
      console.error('Google login failed:', error);
      toast.error(t('auth.errorGoogle'));
    },
  });

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // --- Login Mutation ---
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: res => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res));
      navigate(
        `/${i18n.language !== 'en' ? i18n.language + '/profile' : 'profile'}`
      );
    },
    onError: err => {
      console.error('Login error:', err);
      const msg = err?.response?.data?.message;

      clearErrors();
      setServerError('');

      if (msg === 'Invalid credentials') {
        setError('password', {
          type: 'manual',
          message: t('auth.errorInvalidCredentials'),
        });
        toast.error(t('auth.errorInvalidCredentials'));
      } else if (msg === 'User not found') {
        setError('email', {
          type: 'manual',
          message: t('auth.errorEmailNotFound'),
        });
        toast.error(t('auth.errorEmailNotFound'));
      } else if (Array.isArray(msg)) {
        const joinedMsg = msg.join(', ');
        setServerError(joinedMsg);
        toast.error(joinedMsg);
      } else {
        const serverMsg = t('auth.errorServer');
        setServerError(serverMsg);
        toast.error(serverMsg);
      }
    },
  });

  const onSubmit = data => {
    setServerError('');
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.imageSide}>
            <img src="/auth/bg.jpg" alt={t('auth.imageAlt')} />
          </div>

          <div className={styles.formSide}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <h1 className={styles.title}>{t('auth.loginTitle')}</h1>

              {/* 🔹 Соціальні кнопки */}
              <div className={styles.socialLoginList}>
                <button
                  type="button"
                  className={clsx(styles.social, styles.google)}
                  onClick={() => {
                    // 🔹 Зберігаємо поточну мову в куку на 5 хв
                    document.cookie = `login_lang=${i18n.language}; path=/; max-age=300; SameSite=Lax`;
                    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
                  }}
                >
                  <img src="/auth/google.svg" alt="" />{' '}
                  {t('auth.continueGoogle')}
                </button>

                <button
                  type="button"
                  className={clsx(styles.social, styles.facebook)}
                  onClick={() => {
                    document.cookie = `login_lang=${i18n.language}; path=/; max-age=300; SameSite=Lax`;
                    window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`;
                  }}
                >
                  <img src="/auth/facebook.svg" alt="" />{' '}
                  {t('auth.continueFacebook')}
                </button>
                <button
                  type="button"
                  className={clsx(styles.social, styles.apple)}
                  onClick={() => alert('Apple login coming soon')}
                >
                  <img src="/auth/apple.svg" alt="" /> {t('auth.continueApple')}
                </button>
              </div>

              <div className={styles.divider}>{t('auth.or')}</div>

              {/* 🔹 Серверна помилка */}
              {serverError && (
                <p className={clsx(styles.error, styles.serverError)}>
                  {serverError}
                </p>
              )}

              {/* 🔹 Поля логіну */}
              <div className={styles.simpleLogin}>
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

                <div className={styles.form__part}>
                  <label className={styles.label}>{t('auth.password')}</label>
                  <input
                    type="password"
                    {...register('password', { required: true, minLength: 4 })}
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

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={clsx(
                    'btn_primary',
                    styles.submitBtn,
                    styles.loginBtn,
                    mutation.isPending && styles.load
                  )}
                >
                  <span></span>
                  {t('auth.login')}
                </button>
              </div>

              <p className={styles.bottomText}>
                {t('auth.noAccount')}{' '}
                <Link
                  to={`/${
                    i18n.language !== 'en'
                      ? i18n.language + '/register'
                      : 'register'
                  }`}
                >
                  {t('auth.registration')}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
