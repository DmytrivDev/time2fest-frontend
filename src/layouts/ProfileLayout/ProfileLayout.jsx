// src/layouts/ProfileLayout/ProfileLayout.jsx
import { Outlet } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import styles from './ProfileLayout.module.scss';

export default function ProfileLayout() {
  return (
    <div className={styles.layout}>
      <ProfileSidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
