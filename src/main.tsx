import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import startMSW from '@_/mocks/index.ts';

import App from './App.tsx';
import './styles/reset.css';

await startMSW();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
