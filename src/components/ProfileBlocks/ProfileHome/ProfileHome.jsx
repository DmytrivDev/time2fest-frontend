import ProfileSlider from './ProfileSlider';
import ProfileSub from './ProfileSub';
import ProfileSchd from './ProfileSchd';
import ProfileSoon from './ProfileSoon';

import 'swiper/css';
import styles from './ProfileHome.module.scss';

export default function ProfilePayments() {

  return (
    <div className={styles.profileContent}>
      <ProfileSlider />
      <ProfileSub />
      <ProfileSchd />
      <ProfileSoon />
      <ProfileSub />
    </div>
  );
}
