'use client';

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: (error: unknown) => void;
        }
      ) => void;
      reset: (container: HTMLElement) => void;
    };
  }
}

import { useEffect, useRef } from 'react';

interface CaptchaProps {
  onVerify: (token: string) => void;
  onError: (message: string) => void;
  resetTrigger?: boolean; // для сброса после отправки формы
}

export default function Captcha({ onVerify, onError, resetTrigger }: CaptchaProps) {
  const captchaRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Инициализация при монтировании
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const container = captchaRef.current;
    if (!container) return;

    const init = () => {
      if (!window.smartCaptcha || !container) return;
      window.smartCaptcha.render(container, {
        sitekey: 'ysc1_Y9ltN9soPahKJ8GlyZmvRP29C0Mk0N4TVZKij7PSb497a0a1',
        callback: (token) => onVerify(token),
        'error-callback': () => onError('Ошибка проверки капчи'),
      });
    };

    if (window.smartCaptcha) {
      init();
    } else {
      const script = document.createElement('script');
      script.src = 'https://smartcaptcha.cloud.yandex.ru/captcha.js';
      script.async = true;
      script.onload = init;
      script.onerror = () => onError('Не удалось загрузить капчу');
      document.head.appendChild(script);
    }
  }, []);

  // Сброс капчи после успешной отправки формы
  useEffect(() => {
    if (resetTrigger && window.smartCaptcha && captchaRef.current) {
      window.smartCaptcha.reset(captchaRef.current);
    }
  }, [resetTrigger]);

  return <div ref={captchaRef} className="smart-captcha" />;
}