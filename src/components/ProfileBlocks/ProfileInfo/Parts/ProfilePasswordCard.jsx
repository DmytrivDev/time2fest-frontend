import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { userApi } from '@/utils/userApi';
import styles from '../ProfileInfo.module.scss';

export default function ProfilePasswordCard() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset, // 👈 додаємо reset
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const mutation = useMutation({
    mutationFn: async data => {
      const res = await userApi.post('/change-password', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t('profile.passwordChanged'));
      setServerError('');
      reset(); // 👈 очищаємо всі поля
    },
    onError: err => {
      const msg = err?.response?.data?.message || '';
      clearErrors();

      if (msg.toLowerCase().includes('invalid current password')) {
        setError('currentPassword', {
          type: 'server',
          message: t('profile.errorWrongPassword'),
        });
      } else {
        toast.error(t('profile.errorPassword'));
      }
    },
  });

  const onSubmit = data => {
    clearErrors();
    setServerError('');

    let hasError = false;
    if (!data.currentPassword) {
      setError('currentPassword', {
        type: 'manual',
        message: t('profile.errorEmptyField'),
      });
      hasError = true;
    }
    if (!data.newPassword) {
      setError('newPassword', {
        type: 'manual',
        message: t('profile.errorEmptyField'),
      });
      hasError = true;
    }
    if (!data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t('profile.errorEmptyField'),
      });
      hasError = true;
    }
    if (hasError) return;

    if (data.newPassword.length < 4) {
      setError('newPassword', {
        type: 'manual',
        message: t('auth.errorPasswordWeak'),
      });
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t('auth.errorPasswordMismatch'),
      });
      return;
    }

    mutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.grayPlate}>
      <h2 className={styles.cardTitle}>{t('profile.changePassword')}</h2>

      <div className={styles.fields}>
        {/* ---- Поточний пароль ---- */}
        <div className={styles.inputField}>
          <label className={styles.label}>{t('profile.currentPassword')}</label>
          <input
            type="password"
            {...register('currentPassword')}
            className={clsx(
              styles.input,
              errors.currentPassword && styles.errorInput
            )}
          />
          {errors.currentPassword && (
            <p className={styles.errorText}>{errors.currentPassword.message}</p>
          )}
        </div>

        {/* ---- Новий пароль ---- */}
        <div className={styles.inputField}>
          <label className={styles.label}>{t('profile.newPassword')}</label>
          <input
            type="password"
            {...register('newPassword')}
            className={clsx(
              styles.input,
              errors.newPassword && styles.errorInput
            )}
          />
          {errors.newPassword && (
            <p className={styles.errorText}>{errors.newPassword.message}</p>
          )}
        </div>

        {/* ---- Підтвердження ---- */}
        <div className={styles.inputField}>
          <label className={styles.label}>{t('profile.confirmPassword')}</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={clsx(
              styles.input,
              errors.confirmPassword && styles.errorInput
            )}
          />
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className={clsx(
          'btn_primary',
          styles.saveBtn,
          mutation.isPending && styles.load
        )}
      >
        {t('profile.save')}
        <span></span>
      </button>
    </form>
  );
}
