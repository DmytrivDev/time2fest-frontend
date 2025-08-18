import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async'; // ⬅ додаємо
import './styles/main.scss';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HelmetProvider>,
  );
} else {
  console.error('❌ Element with ID "root" not found.');
}
