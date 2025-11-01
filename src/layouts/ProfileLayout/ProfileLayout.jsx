// src/layouts/ProfileLayout/ProfileLayout.jsx
import { Outlet, useOutletContext } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import styles from './ProfileLayout.module.scss';

export default function ProfileLayout() {
  const parentContext = useOutletContext();

  return (
    <div className={styles.layout}>
      <ProfileSidebar />
      <div className={styles.content}>
        <Outlet context={parentContext} />
      </div>
    </div>
  );
}
