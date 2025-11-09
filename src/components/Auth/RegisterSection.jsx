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

const registerUser = async data => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      policy: false,
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: res => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res));
      navigate(
        `/${i18n.language !== 'en' ? i18n.language + '/profile' : 'profile'}`
      );
    },
    onError: err => {
      console.error('Registration error:', err);
      const msg = err?.response?.data?.message;

      // Спочатку очищуємо попередні помилки
      clearErrors();
      setServerError('');

      if (msg === 'Email already in use') {
        setError('email', {
          type: 'manual',
          message: t('auth.errorEmailExists'),
        });
      } else if (
        Array.isArray(msg) &&
        msg.some(m => m.toLowerCase().includes('password'))
      ) {
        setError('password', {
          type: 'manual',
          message: t('auth.errorPasswordWeak'),
        });
      } else if (Array.isArray(msg)) {
        setServerError(msg.join(', '));
      } else {
        setServerError(t('auth.errorServer'));
      }
    },
  });

  const onSubmit = data => {
    setServerError('');
    mutation.mutate({
      name: data.name,
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
              <h1 className={styles.title}>{t('auth.registerTitle')}</h1>

              {/* 🔹 Соціальні кнопки (ще без логіки) */}
              <div className={styles.socialLoginList}>
                <button
                  type="button"
                  className={clsx(styles.social, styles.google)}
                  onClick={() => {
                    localStorage.setItem('preferredLang', i18n.language);
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
                    localStorage.setItem('preferredLang', i18n.language);
                    window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`;
                  }}
                >
                  <img src="/auth/facebook.svg" alt="" />{' '}
                  {t('auth.continueFacebook')}
                </button>
                {/* <button
                  type="button"
                  className={clsx(styles.social, styles.apple)}
                  onClick={() => {
                    localStorage.setItem('preferredLang', i18n.language);
                    window.location.href = `${import.meta.env.VITE_API_URL}/auth/apple`;
                  }}
                >
                  <img src="/auth/apple.svg" alt="" /> {t('auth.continueApple')}
                </button> */}
              </div>

              <div className={styles.divider}>{t('auth.or')}</div>

              {/* 🔹 Серверна помилка (над усіма полями) */}
              {serverError && (
                <p className={clsx(styles.error, styles.serverError)}>
                  {serverError}
                </p>
              )}

              {/* 🔹 Поля звичайної реєстрації */}
              <div className={styles.simpleLogin}>
                <div className={styles.form__part}>
                  <label className={styles.label}>{t('auth.username')}</label>
                  <input
                    type="text"
                    {...register('name', { required: true, minLength: 2 })}
                    className={clsx(
                      styles.input,
                      errors.name && styles.errorInput
                    )}
                    placeholder={t('auth.usernamePlaceholder')}
                  />
                  {errors.name && (
                    <p className={styles.error}>{t('auth.errorUsername')}</p>
                  )}
                </div>

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

                <div className={clsx('checkAgree', styles.checkAgree)}>
                  <label>
                    <input
                      type="checkbox"
                      {...register('policy', { required: true })}
                    />{' '}
                    <span></span>
                    <p>
                      {t('form.iAgree')}{' '}
                      <a
                        href={`/${
                          i18n.language !== 'en' ? i18n.language + '/' : ''
                        }privacy`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('form.privacy')}
                      </a>{' '}
                      {t('form.and')}{' '}
                      <a
                        href={`/${
                          i18n.language !== 'en' ? i18n.language + '/' : ''
                        }terms`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('form.terms')}
                      </a>
                    </p>
                  </label>
                  {errors.policy && (
                    <p className={styles.error}>{t('contact.error_policy')}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={clsx(
                    'btn_primary',
                    styles.submitBtn,
                    mutation.isPending && styles.load
                  )}
                >
                  <span></span>
                  {t('auth.register')}
                </button>
              </div>

              <p className={styles.bottomText}>
                {t('auth.haveAccount')}{' '}
                <Link
                  to={`/${i18n.language !== 'en' ? i18n.language + '/login' : 'login'}`}
                >
                  {t('auth.login')}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
