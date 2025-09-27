import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import clsx from 'clsx';

import styles from './AmbassForm.module.scss';

const ageOptions = [
  { value: 'under18', label: 'До 18' },
  { value: '18-24', label: '18–24' },
  { value: '25-34', label: '25–34' },
  { value: '35-44', label: '35–44' },
  { value: '45+', label: '45+' },
];

const contactOptions = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'viber', label: 'Viber' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook Messenger' },
  { value: 'email', label: 'Email' },
  { value: 'other', label: 'Інше (вкажіть)' },
];

const socialOptions = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Facebook',
  'X (Twitter)',
  'Threads',
  'LinkedIn',
  'Reddit',
  'OnlyFans',
  'Other',
];

const englishOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const experienceOptions = [
  { value: 'yes', label: 'Так' },
  { value: 'no', label: 'Ні' },
  { value: 'minimal', label: 'Мінімальний' },
];

const streamLangOptions = [
  { value: 'english', label: 'Англійська' },
  { value: 'native', label: 'Рідна' },
  { value: 'both', label: 'Обидві' },
];

export default function AmbassadorForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selectedSocials, setSelectedSocials] = useState([]);

  const onSubmit = data => {
    console.log('Form data:', data);
    alert('Заявка відправлена!');
  };

  const handleSocialChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSocials([...selectedSocials, value]);
    } else {
      setSelectedSocials(selectedSocials.filter(s => s !== value));
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.heading}>
            <p className={styles.tagline}>
              Станьте обличчям свого міста або країни на глобальному святкуванні
              Нового року!
            </p>
            <h1>Станьте амбасадором Time2Fest</h1>
            <p className={styles.text}>
              Амбасадори Time2Fest виходять в прямий ефір, щоб показати, як
              їхній регіон зустрічає Новий рік, ділячись атмосферою та
              традиціями.
            </p>
          </div>

          {/* Блок 1 */}
          <div className={styles.block}>
            <h2>Блок 1. Основна інформація</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>Ваше повне ім’я або псевдонім (обов’язково)</label>
                <input
                  type="text"
                  placeholder="Пишіть тут"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className={styles.error}>Це поле є обов'язковим</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>
                  Країна, місто або регіон, який ви будете представляти
                  (обов’язково)
                </label>
                <input
                  type="text"
                  placeholder="Пишіть тут"
                  {...register('country', { required: true })}
                />
                {errors.country && (
                  <p className={styles.error}>Це поле є обов'язковим</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>Ваш вік (оберіть проміжок) (обов’язково)</label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={ageOptions}
                      placeholder="Виберіть..."
                      className="selector"
                    />
                  )}
                />
                {errors.age && (
                  <p className={styles.error}>Виберіть один з варіантів</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>
                  Контактна інформація (оберіть зручний спосіб зв’язку,
                  обов’язково)
                </label>
                <Controller
                  name="contactMethod"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={contactOptions}
                      placeholder="Виберіть..."
                      className="selector"
                    />
                  )}
                />
                {errors.contactMethod && (
                  <p className={styles.error}>Виберіть один з варіантів</p>
                )}
              </div>

              <div className={styles.fieldGr}>
                <label>Посилання на акаунт або номер телефону</label>
                <input
                  type="text"
                  placeholder="Пишіть тут"
                  {...register('contactLink', { required: true })}
                />
                {errors.contactLink && (
                  <p className={styles.error}>Це поле є обов'язковим</p>
                )}
              </div>
            </div>
          </div>

          {/* Блок 2 */}
          <div className={styles.block}>
            <h2>Блок 2. Досвід і соцмережі</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>
                  Чи ведете ви активні блоги в соціальних мережах? (оберіть
                  платформи)
                </label>
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
                          placeholder={`Посилання на ${soc}`}
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
                <label>
                  Чи маєте ви досвід у створенні контенту чи прямих ефірів?
                </label>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={experienceOptions}
                      placeholder="Виберіть..."
                      className="selector"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Блок 3 */}
          <div className={styles.block}>
            <h2>Блок 3. Мова і формат стріму</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>Ваш рівень знання англійської мови</label>
                <Controller
                  name="englishLevel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={englishOptions}
                      placeholder="Виберіть..."
                      className="selector"
                    />
                  )}
                />
              </div>

              <div className={styles.fieldGr}>
                <label>Мова, якою ви плануєте вести стрім</label>
                <Controller
                  name="streamLang"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={streamLangOptions}
                      placeholder="Виберіть..."
                      className="selector"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Блок 4 */}
          <div className={styles.block}>
            <h2>Блок 4. Мотивація і промо</h2>
            <div className={styles.fields}>
              <div className={styles.fieldGr}>
                <label>
                  Чому ви хочете стати амбасадором Time2Fest? (обов’язково)
                </label>
                <textarea
                  placeholder="Пишіть тут"
                  {...register('motivation', { required: true })}
                />
                {errors.motivation && (
                  <p className={styles.error}>Це поле є обов'язковим</p>
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
                <p>Я погоджуюсь з умовами <a href="#">політики конфіденційності</a></p>
              </label>
              {errors.policy && (
                <p className={styles.error}>Необхідно погодитись</p>
              )}
            </div>

            <button type="submit" className="btn_primary">
              Відправити заявку
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
