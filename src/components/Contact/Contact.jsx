import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api'; 

import SocialLinks from '../common/SocialLinks/SocialLinks';
import Modal from '../Modal/Modal';
import styles from './Contact.module.scss';

const STORAGE_KEY = 'contactForm';

const submitContact = async formData => {
  const res = await api.post('/contacts', formData);
  return res.data;
};

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isClearingRef = useRef(false);

  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);

  const savedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setSuccessOpen(true);
      isClearingRef.current = true;
      sessionStorage.removeItem(STORAGE_KEY);
      reset({
        name: '',
        email: '',
        subject: null,
        message: '',
        policy: false,
      });
      setTimeout(() => {
        isClearingRef.current = false;
      }, 0);
    },
    onError: () => setErrorOpen(true),
  });

  const subjectOptions = [
    { value: 'tech', label: t('contact.subject_tech') },
    { value: 'cooperation', label: t('contact.subject_coop') },
    { value: 'other', label: t('contact.subject_other') },
  ];

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: savedData,
  });

  const formRef = useRef(null);

  const onSubmit = data => {
    const payload = {
      ...data,
      subject: data.subject?.value || data.subject,
      policy: Boolean(data.policy),
    };
    mutation.mutate(payload);
  };

  // Збереження у sessionStorage при зміні полів
  useEffect(() => {
    const subscription = watch(values => {
      if (!isClearingRef.current) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Автоскрол до верху при помилках
  useEffect(() => {
    if (Object.keys(errors).length > 0 && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errors]);

  return (
    <>
      <section className={styles.section} ref={formRef}>
        <div className="container">
          <div className={styles.content}>
            {/* ---- ЛІВА КОЛОНКА ---- */}
            <div className={styles.infoBlock}>
              <h2 className={styles.title}>{t('contact.title_left')}</h2>

              <p className={styles.subtitle}>{t('contact.email_title')}</p>
              <a href="mailto:time2fest@gmail.com" className={styles.email}>
                time2fest@gmail.com
              </a>

              <p className={styles.text}>{t('contact.email_hint')}</p>

              <p className={styles.socialTitle}>{t('contact.socials_title')}</p>
              <SocialLinks />
            </div>

            {/* ---- ПРАВА КОЛОНКА ---- */}
            <div className={styles.formBlock}>
              <h2 className={styles.title}>{t('contact.title_right')}</h2>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label>{t('contact.label_name')}</label>
                  <input
                    type="text"
                    placeholder={t('contact.placeholder_name')}
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <p className={styles.error}>{t('contact.error_name')}</p>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label>{t('contact.label_email')}</label>
                  <input
                    type="email"
                    placeholder={t('contact.placeholder_email')}
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <p className={styles.error}>{t('contact.error_email')}</p>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label>{t('contact.label_subject')}</label>
                  <Controller
                    name="subject"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={subjectOptions}
                        placeholder={t('contact.subject_select')}
                        className="selector"
                      />
                    )}
                  />
                  {errors.subject && (
                    <p className={styles.error}>{t('contact.error_subject')}</p>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label>{t('contact.label_message')}</label>
                  <textarea
                    rows="4"
                    placeholder={t('contact.placeholder_message')}
                    {...register('message', { required: true })}
                  ></textarea>
                  {errors.message && (
                    <p className={styles.error}>{t('contact.error_message')}</p>
                  )}
                </div>

                <div className={styles.bottom}>
                  <div className="checkAgree">
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
                      </p>
                    </label>
                    {errors.policy && (
                      <p className={styles.error}>
                        {t('contact.error_policy')}
                      </p>
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
                    {t('contact.btn_submit')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODALS --- */}
      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setSuccessOpen(false)}
        title={t('contact.modal_success_title')}
      >
        <p>{t('contact.modal_success_text')}</p>
      </Modal>

      <Modal
        isOpen={isErrorOpen}
        onClose={() => setErrorOpen(false)}
        title={t('contact.modal_error_title')}
      >
        <p>{t('contact.modal_error_text')}</p>
      </Modal>
    </>
  );
}
