import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { userApi } from '@/utils/userApi';
import styles from '../ProfileInfo.module.scss';

export default function ProfileNameCard({ user }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: user?.name || '' },
  });

  const mutation = useMutation({
    mutationFn: async data => {
      const res = await userApi.post('/update-profile', data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(t('profile.updated'));
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem(
        'user',
        JSON.stringify({ ...savedUser, name: variables.name })
      );
    },
    onError: error => {
      // 🔹 Якщо refresh ще триває — не показуємо помилку
      if (error?.config?._retry) return;

      console.error('❌ Update profile error:', error);
      toast.error(t('profile.errorUpdate'));
    },
  });

  const onSubmit = data => {
    if (!data.name.trim()) {
      toast.error(t('profile.errorEmpty', 'Введіть ім’я'));
      return;
    }
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.grayPlate}>
      <h2 className={styles.cardTitle}>{t('profile.infoTitle')}</h2>
      <div className={styles.inputField}>
        <label className={styles.label}>{t('profile.name')}</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className={clsx(styles.input, errors.name && styles.errorInput)}
          placeholder={t('profile.namePlaceholder')}
        />
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
        {t('profile.save', 'Зберегти')}
        <span></span>
      </button>
    </form>
  );
}
