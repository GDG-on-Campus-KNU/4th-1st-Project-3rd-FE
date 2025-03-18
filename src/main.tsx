import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import startMSW from './mocks/index.ts';
import './styles/reset.css';

if (import.meta.env.VITE_MSW) {
  await startMSW();
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
