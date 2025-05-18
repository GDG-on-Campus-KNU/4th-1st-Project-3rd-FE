import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import startMSW from './mocks/index.ts';
import './styles/reset.css';

if (import.meta.env.VITE_MSW) {
  await startMSW();
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  // @ts-expect-error 공식 기능이 아니기에 에러가 뜸
  // https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
  event.prompt?.();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
