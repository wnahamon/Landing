"use client";

import { useEffect, useRef, useCallback } from "react";

interface SmartCaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export default function SmartCaptcha({
  siteKey,
  onVerify,
  onExpire,
  className,
}: SmartCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    if (onExpire) onExpireRef.current = onExpire;
  }, [onVerify, onExpire]);

  useEffect(() => {
    const initCaptcha = () => {
      if (typeof window.yaSmartCaptcha === "undefined") return;

      const widgetId = window.yaSmartCaptcha.render(containerRef.current!, {
        sitekey: siteKey,
        callback: (token: string) => onVerifyRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
      });

      return () => {
        if (widgetId) window.yaSmartCaptcha.reset(widgetId);
      };
    };

    if (!window.yaSmartCaptcha) {
      const script = document.createElement("script");
      script.src = "https://smartcaptcha.yandexcloud.net/captcha.js";
      script.async = true;
      script.defer = true;
      script.onload = initCaptcha;
      document.head.appendChild(script);
    } else {
      initCaptcha();
    }
  }, [siteKey]);

  return <div ref={containerRef} className={className} />;
}

// Добавляем тип для window
declare global {
  interface Window {
    yaSmartCaptcha: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}
