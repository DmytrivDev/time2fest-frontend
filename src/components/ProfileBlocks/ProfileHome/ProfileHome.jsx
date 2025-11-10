import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { getValidLocale } from '@/utils/getValidLocale';

import ProfileSlider from './ProfileSlider';
import ProfileSub from './ProfileSub';
import ProfileSchd from './ProfileSchd';
import ProfileSoon from './ProfileSoon';
import ProfileVideo from './ProfileVideo';

import 'swiper/css';
import styles from './ProfileHome.module.scss';

export default function ProfilePayments() {
  const locale = getValidLocale();

  // Запит на верхній блок (Hero)
  const { data, loading, error } = useQuery({
    queryKey: ['profile-page', locale],
    queryFn: async () => {
      const res = await api.get(`/profile-page?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className={styles.profileContent}>
      <ProfileSlider data={data?.Banner} isLoading={loading} error={error} />
      <ProfileSub />
      <ProfileSchd />
      <ProfileSoon />
      <ProfileVideo data={data?.Video} isLoading={loading} error={error} />
      <ProfileSub />
    </div>
  );
}
