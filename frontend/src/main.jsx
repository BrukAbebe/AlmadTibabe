import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics'; 
import './index.css';
import App from './App.jsx';

// Suppress console in production
if (import.meta.env.PROD) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
}

// Initialize Vercel Analytics
inject({
  mode: import.meta.env.DEV ? 'development' : 'production',
  debug: import.meta.env.DEV,
  beforeSend: (event) => {
    if (event.url.includes('localhost')) return null;
    return event;
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);