import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

import './styles/index.scss';

const queryClient = new QueryClient();

// 👇 додаємо цей блок перед ReactDOM.createRoot
const supported = ['uk', 'en', 'es', 'fr'];
const firstSegment = window.location.pathname.split('/')[1];

// якщо є префікс зі списку → беремо його, інакше дефолт en
const lang = supported.includes(firstSegment) ? firstSegment : 'en';
document.documentElement.lang = lang;
// 👆 тепер Chrome одразу бачить правильну мову

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </BrowserRouter>
);
