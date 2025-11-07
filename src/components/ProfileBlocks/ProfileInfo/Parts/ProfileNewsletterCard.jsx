import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { userApi } from '@/utils/userApi';
import styles from '../ProfileInfo.module.scss';

export default function ProfileNewsletterCard() {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [checked, setChecked] = useState(!!user?.newsletter);

  const mutation = useMutation({
    mutationFn: async data => {
      const res = await userApi.post('/update-profile', data);
      return res.data;
    },
    onSuccess: data => {
      toast.success(t('profile.saved', 'Налаштування збережено'));
      // 🔹 Оновлюємо користувача в localStorage
      const updatedUser = { ...user, newsletter: checked };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    },
    onError: () => toast.error(t('profile.errorSave', 'Помилка збереження')),
  });

  const handleChange = () => {
    const newVal = !checked;
    setChecked(newVal);
    mutation.mutate({ newsletter: newVal });
  };

  return (
    <div className={clsx(styles.grayPlate, styles.fullH)}>
      <div className={clsx('checkAgree')}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={mutation.isPending}
          />
          <span></span>
          <p>{t('profile.newsletterText')}</p>
        </label>
      </div>
    </div>
  );
}
