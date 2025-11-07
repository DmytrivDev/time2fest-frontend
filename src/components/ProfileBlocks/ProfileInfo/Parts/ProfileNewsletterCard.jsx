import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { api } from '@/utils/api';
import styles from '../ProfileInfo.module.scss';

export default function ProfileNewsletterCard() {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [checked, setChecked] = useState(!!user?.newsletter);

  const mutation = useMutation({
    mutationFn: async data => {
      const res = await api.post('/api/update-profile', data);
      return res.data;
    },
    onSuccess: () =>
      toast.success(t('profile.saved', 'Налаштування збережено')),
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
          <input type="checkbox" checked={checked} onChange={handleChange} />
          <span></span>
          <p>{t('profile.newsletterText')} </p>
        </label>
      </div>
    </div>
  );
}
