import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

import styles from './AmbassForm.module.scss';

const STORAGE_KEY = 'ambassadorForm';

const submitForm = async formData => {
  const res = await api.post('/ambassadors', formData);
  return res.data;
};

export default function AmbassadorForm() {
  const { t } = useTranslation();
  const isClearingRef = useRef(false);

  const savedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');

  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      alert('Заявка відправлена!');
      isClearingRef.current = true; // блокуємо автозбереження
      sessionStorage.removeItem(STORAGE_KEY);

      reset({
        name: '',
        country: '',
        age: null,
        contactMethod: null,
        contactLink: '',
        socialLinks: {},
        experience: null,
        englishLevel: null,
        streamLang: null,
        motivation: '',
        policy: false,
      });

      setSelectedSocials([]); // чистимо чекбокси

      setTimeout(() => {
        isClearingRef.current = false; // дозволяємо знову автозбереження
      }, 0);
    },
    onError: () => {
      alert('Помилка при відправці');
    },
  });

  const ageOptions = [
    { value: 'under18', label: t('form.age.under18') },
    { value: '18-24', label: t('form.age.18_24') },
    { value: '25-34', label: t('form.age.25_34') },
    { value: '35-44', label: t('form.age.35_44') },
    { value: '45+', label: t('form.age.45_plus') },
  ];

  const contactOptions = [
    { value: 'telegram', label: t('form.contact.telegram') },
    { value: 'whatsapp', label: t('form.contact.whatsapp') },
    { value: 'viber', label: t('form.contact.viber') },
    { value: 'instagram', label: t('form.contact.instagram') },
    { value: 'facebook', label: t('form.contact.facebook') },
    { value: 'email', label: t('form.contact.email') },
    { value: 'other', label: t('form.contact.other') },
  ];

  const socialOptions = [
    t('form.social.instagram'),
    t('form.social.tiktok'),
    t('form.social.youtube'),
    t('form.social.facebook'),
    t('form.social.x'),
    t('form.social.threads'),
    t('form.social.linkedin'),
    t('form.social.reddit'),
    t('form.social.onlyfans'),
    t('form.social.other'),
  ];

  const englishOptions = [
    { value: 'beginner', label: t('form.english.beginner') },
    { value: 'intermediate', label: t('form.english.intermediate') },
    { value: 'advanced', label: t('form.english.advanced') },
  ];

  const experienceOptions = [
    { value: 'yes', label: t('form.experience.yes') },
    { value: 'no', label: t('form.experience.no') },
    { value: 'minimal', label: t('form.experience.minimal') },
  ];

  const streamLangOptions = [
    { value: 'english', label: t('form.streamLang.english') },
    { value: 'native', label: t('form.streamLang.native') },
    { value: 'both', label: t('form.streamLang.both') },
  ];

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: savedData, // відновлення з sessionStorage
  });

  const [selectedSocials, setSelectedSocials] = useState(
    Object.keys(savedData?.socialLinks || {})
  );
  const formRef = useRef(null);

  const onSubmit = data => {
    // Перетворюємо select-поля в прості строки
    const payload = {
      ...data,
      age: data.age?.value || data.age,
      contactMethod: data.contactMethod?.value || data.contactMethod,
      englishLevel: data.englishLevel?.value || data.englishLevel,
      experience: data.experience?.value || data.experience,
      streamLang: data.streamLang?.value || data.streamLang,
      policy: Boolean(data.policy), // щоб точно було true/false
    };

    mutation.mutate(payload);
  };

  const handleSocialChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSocials([...selectedSocials, value]);
    } else {
      setSelectedSocials(selectedSocials.filter(s => s !== value));
    }
  };

  // збереження у sessionStorage при будь-якій зміні
  useEffect(() => {
    const subscription = watch(values => {
      if (!isClearingRef.current) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // скрол при помилках
  useEffect(() => {
    if (Object.keys(errors).length > 0 && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errors]);

  return (
    <section className={styles.section} ref={formRef}>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.heading}>
            <p className={styles.tagline}>{t('form.tagline')}</p>
            <h1>{t('form.title')}</h1>
            <p className={styles.text}>{t('form.subtitle')}</p>
          </div>

          {/* Блок 1 */}
          <div className={styles.block}>
            <h2>{t('form.block1Title')}</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>{t('form.nameLabel')}</label>
                <input
                  type="text"
                  placeholder={t('form.placeholder')}
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className={styles.error}>{t('form.errorRequired')}</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>{t('form.countryLabel')}</label>
                <input
                  type="text"
                  placeholder={t('form.placeholder')}
                  {...register('country', { required: true })}
                />
                {errors.country && (
                  <p className={styles.error}>{t('form.errorRequired')}</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>{t('form.ageLabel')}</label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={ageOptions}
                      placeholder={t('form.selectPlaceholder')}
                      className="selector"
                    />
                  )}
                />
                {errors.age && (
                  <p className={styles.error}>{t('form.errorSelect')}</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>{t('form.contactLabel')}</label>
                <Controller
                  name="contactMethod"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={contactOptions}
                      placeholder={t('form.selectPlaceholder')}
                      className="selector"
                    />
                  )}
                />
                {errors.contactMethod && (
                  <p className={styles.error}>{t('form.errorSelect')}</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>{t('form.contactLinkLabel')}</label>
                <input
                  type="text"
                  placeholder={t('form.placeholder')}
                  {...register('contactLink', { required: true })}
                />
                {errors.contactLink && (
                  <p className={styles.error}>{t('form.errorRequired')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Блок 2 */}
          <div className={styles.block}>
            <h2>{t('form.block2Title')}</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>{t('form.socialLabel')}</label>
                <div className={styles.checkboxes}>
                  {socialOptions.map(soc => (
                    <div
                      key={soc}
                      className={clsx(
                        styles.checkbox,
                        selectedSocials.includes(soc) && styles.checked
                      )}
                    >
                      <label>
                        <input
                          type="checkbox"
                          value={soc}
                          onChange={handleSocialChange}
                        />
                        <span></span>
                        {soc}
                      </label>
                      {selectedSocials.includes(soc) && (
                        <input
                          type="text"
                          placeholder={`${t('form.linkPlaceholder')} ${soc}`}
                          {...register(`socialLinks.${soc}`, {
                            required: true,
                          })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGr}>
                <label>{t('form.experienceLabel')}</label>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={experienceOptions}
                      placeholder={t('form.selectPlaceholder')}
                      className="selector"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Блок 3 */}
          <div className={styles.block}>
            <h2>{t('form.block3Title')}</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>{t('form.englishLabel')}</label>
                <Controller
                  name="englishLevel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={englishOptions}
                      placeholder={t('form.selectPlaceholder')}
                      className="selector"
                    />
                  )}
                />
              </div>

              <div className={styles.fieldGr}>
                <label>{t('form.streamLangLabel')}</label>
                <Controller
                  name="streamLang"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={streamLangOptions}
                      placeholder={t('form.selectPlaceholder')}
                      className="selector"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Блок 4 */}
          <div className={styles.block}>
            <h2>{t('form.block4Title')}</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>{t('form.motivationLabel')}</label>
                <textarea
                  placeholder={t('form.placeholder')}
                  {...register('motivation', { required: true })}
                />
                {errors.motivation && (
                  <p className={styles.error}>{t('form.errorRequired')}</p>
                )}
              </div>
            </div>
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
                  {t('form.policyText')} <a href="#">{t('form.policyLink')}</a>
                </p>
              </label>
              {errors.policy && (
                <p className={styles.error}>{t('form.errorPolicy')}</p>
              )}
            </div>

            <button type="submit" className="btn_primary">
              {t('form.submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
