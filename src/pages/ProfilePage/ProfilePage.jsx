// src/pages/ProfilePage.jsx
import React from 'react';

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div style={{ padding: '40px', color: '#fff' }}>
      <h1>Welcome, {user.name || 'User'} 🎆</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
