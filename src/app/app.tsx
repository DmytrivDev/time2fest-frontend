import { Outlet } from 'react-router-dom';
import { Header } from '@/features/header';

export function App() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
}
