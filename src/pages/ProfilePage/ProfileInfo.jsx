// src/pages/ProfilePage/ProfileInfo.jsx
export default function ProfileInfo() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <h1>👋 Привіт, {user.name || 'Користувач'}!</h1>
      <p>Email: {user.email || '—'}</p>
      <p>Дата реєстрації: {user.createdAt || '—'}</p>
    </div>
  );
}
