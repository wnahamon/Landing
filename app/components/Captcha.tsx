'use client';

declare const window: Window & { smartCaptcha?: {
  render: (container: HTMLElement, options: { sitekey: string }) => void;
  getToken: (container: HTMLElement) => string | null;
  reset: (container: HTMLElement) => void;
} };

import { useEffect, useRef, RefObject } from 'react';

interface CaptchaProps {
  onVerify: (token: string) => void;
  onError: (message: string) => void;
}

export default function Captcha({ onVerify, onError }: CaptchaProps) {
  const captchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Загружаем скрипт SmartCaptcha
    const script = document.createElement('script');
    script.src = 'https://smartcaptcha.cloud.yandex.ru/captcha.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Инициализируем капчу после загрузки скрипта
      if (window.smartCaptcha && captchaRef.current) {
        window.smartCaptcha.render(captchaRef.current, {
          sitekey: 'ysc1_Y9ltN9soPahKJ8GlyZmvRP29C0Mk0N4TVZKij7PSb497a0a1', // замените на ваш ключ
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Очистка: удаляем скрипт при размонтировании компонента
      document.head.removeChild(script);
    };
  }, []);

  const handleVerify = () => {
    if (window.smartCaptcha) {
      const token = window.smartCaptcha.getToken(captchaRef.current!);
      if (token) {
        onVerify(token);
      } else {
        onError('Пожалуйста, пройдите проверку капчи');
      }
    } else {
      onError('Сервис капчи не загружен');
    }
  };

  return (
    <div>
      <div ref={captchaRef} className="smart-captcha" />
      <button
        type="button"
        onClick={handleVerify}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Проверить капчу
      </button>
    </div>
  );
}
