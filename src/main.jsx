import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

window.recaptchaOptions = {
  useRecaptchaNet: true,
};

window.addEventListener(
  'error',
  (event) => {
    const message = String(event?.message || '');
    const filename = String(event?.filename || '');
    if (message.includes('reCAPTCHA Timeout') || filename.includes('recaptcha__en.js')) {
      event.preventDefault();
    }
  },
  true,
);

window.addEventListener('unhandledrejection', (event) => {
  const message = String(event?.reason?.message || event?.reason || '');
  if (message.includes('reCAPTCHA Timeout')) {
    event.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
