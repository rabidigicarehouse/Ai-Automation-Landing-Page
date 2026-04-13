'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../src/App.jsx'), { ssr: false });

export default function Page() {
  useEffect(() => {
    window.recaptchaOptions = {
      useRecaptchaNet: true,
    };

    const onError = (event) => {
      const message = String(event?.message || '');
      const filename = String(event?.filename || '');
      if (message.includes('reCAPTCHA Timeout') || filename.includes('recaptcha__en.js')) {
        event.preventDefault();
      }
    };

    const onUnhandledRejection = (event) => {
      const message = String(event?.reason?.message || event?.reason || '');
      if (message.includes('reCAPTCHA Timeout')) {
        event.preventDefault();
      }
    };

    window.addEventListener('error', onError, true);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onError, true);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return <App />;
}
