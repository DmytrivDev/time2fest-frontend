import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const ageOptions = [
  { value: "under18", label: "До 18" },
  { value: "18-24", label: "18–24" },
  { value: "25-34", label: "25–34" },
  { value: "35-44", label: "35–44" },
  { value: "45+", label: "45+" },
];

const contactOptions = [
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "viber", label: "Viber" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook Messenger" },
  { value: "email", label: "Email" },
  { value: "other", label: "Інше (вкажіть)" },
];

const socialOptions = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "X (Twitter)",
  "Threads",
  "LinkedIn",
  "Reddit",
  "OnlyFans",
  "Other",
];

const englishOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const experienceOptions = [
  { value: "yes", label: "Так" },
  { value: "no", label: "Ні" },
  { value: "minimal", label: "Мінімальний" },
];

const streamLangOptions = [
  { value: "english", label: "Англійська" },
  { value: "native", label: "Рідна" },
  { value: "both", label: "Обидві" },
];

export default function AmbassadorForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedSocials, setSelectedSocials] = useState([]);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    alert("Заявка відправлена!");
  };

  const handleSocialChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSocials([...selectedSocials, value]);
    } else {
      setSelectedSocials(selectedSocials.filter((s) => s !== value));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ambassador-form">
      <p className="form-tagline">
        Станьте обличчям свого міста або країни на глобальному святкуванні Нового року!
      </p>
      <h2>Станьте амбасадором Time2Fest</h2>
      <p>
        Амбасадори Time2Fest виходять в прямий ефір, щоб показати, як їхній регіон зустрічає Новий рік,
        ділячись атмосферою та традиціями.
      </p>

      {/* Блок 1 */}
      <h3>Блок 1. Основна інформація</h3>

      <label>Ваше повне ім’я або псевдонім (обов’язково)</label>
      <input
        type="text"
        placeholder="Пишіть тут"
        {...register("name", { required: true })}
      />
      {errors.name && <p className="error">Це поле є обов'язковим</p>}

      <label>Країна, місто або регіон, який ви будете представляти (обов’язково)</label>
      <input
        type="text"
        placeholder="Пишіть тут"
        {...register("country", { required: true })}
      />
      {errors.country && <p className="error">Це поле є обов'язковим</p>}

      <label>Ваш вік (оберіть проміжок) (обов’язково)</label>
      <Controller
        name="age"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select {...field} options={ageOptions} placeholder="Виберіть..." />
        )}
      />
      {errors.age && <p className="error">Виберіть один з варіантів</p>}

      <label>Контактна інформація (оберіть зручний спосіб зв’язку, обов’язково)</label>
      <Controller
        name="contactMethod"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select {...field} options={contactOptions} placeholder="Виберіть..." />
        )}
      />
      {errors.contactMethod && <p className="error">Виберіть один з варіантів</p>}

      <label>Посилання на акаунт або номер телефону</label>
      <input
        type="text"
        placeholder="Пишіть тут"
        {...register("contactLink", { required: true })}
      />
      {errors.contactLink && <p className="error">Це поле є обов'язковим</p>}

      {/* Блок 2 */}
      <h3>Блок 2. Досвід і соцмережі</h3>

      <label>Чи ведете ви активні блоги в соціальних мережах? (оберіть платформи)</label>
      {socialOptions.map((soc) => (
        <div key={soc}>
          <label>
            <input
              type="checkbox"
              value={soc}
              onChange={handleSocialChange}
            />
            {soc}
          </label>
          {selectedSocials.includes(soc) && (
            <input
              type="text"
              placeholder={`Посилання на ${soc}`}
              {...register(`socialLinks.${soc}`, { required: true })}
            />
          )}
        </div>
      ))}

      <label>Чи маєте ви досвід у створенні контенту чи прямих ефірів?</label>
      <Controller
        name="experience"
        control={control}
        render={({ field }) => (
          <Select {...field} options={experienceOptions} placeholder="Виберіть..." />
        )}
      />

      {/* Блок 3 */}
      <h3>Блок 3. Мова і формат стріму</h3>

      <label>Ваш рівень знання англійської мови</label>
      <Controller
        name="englishLevel"
        control={control}
        render={({ field }) => (
          <Select {...field} options={englishOptions} placeholder="Виберіть..." />
        )}
      />

      <label>Мова, якою ви плануєте вести стрім</label>
      <Controller
        name="streamLang"
        control={control}
        render={({ field }) => (
          <Select {...field} options={streamLangOptions} placeholder="Виберіть..." />
        )}
      />

      {/* Блок 4 */}
      <h3>Блок 4. Мотивація і промо</h3>

      <label>Чому ви хочете стати амбасадором Time2Fest? (обов’язково)</label>
      <textarea
        placeholder="Пишіть тут"
        {...register("motivation", { required: true })}
      />
      {errors.motivation && <p className="error">Це поле є обов'язковим</p>}

      {/* Політика */}
      <div className="policy">
        <label>
          <input
            type="checkbox"
            {...register("policy", { required: true })}
          />{" "}
          Я погоджуюсь з умовами політики конфіденційності
        </label>
        {errors.policy && <p className="error">Це поле є обов'язковим</p>}
      </div>

      <button type="submit">Відправити заявку</button>
    </form>
  );
}
