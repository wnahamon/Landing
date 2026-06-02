// app/api/submit/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message, honeypot, captchaToken } = body;

    // 1. Защита от спама (Honeypot)
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // 2. Проверка наличия токена капчи
    if (!captchaToken) {
      return NextResponse.json({ error: "Пожалуйста, пройдите проверку капчи" }, { status: 400 });
    }

    // 3. Валидация токена на стороне Яндекса
    const secret = process.env.YANDEX_SMARTCAPTCHA_SECRET;
    if (!secret) {
      console.error("Не задан секретный ключ капчи в .env.local");
      return NextResponse.json({ error: "Ошибка конфигурации сервера" }, { status: 500 });
    }

    // Отправляем запрос в Яндекс для проверки токена
    const verifyUrl = `https://smartcaptcha.yandexcloud.net/validate?secret=${secret}&token=${captchaToken}`;
    const captchaRes = await fetch(verifyUrl);
    const captchaResult = await captchaRes.json();

    // Если Яндекс ответил, что статус не "ok", значит капча не пройдена
    if (captchaResult.status !== "ok") {
      console.warn("Капча не пройдена:", captchaResult);
      return NextResponse.json({ error: "Не удалось проверить капчу. Попробуйте еще раз." }, { status: 403 });
    }

    // 4. Если всё хорошо, обрабатываем заявку 
    // (тут можно сохранить в базу, отправить в Telegram, на почту и т.д.)
    console.log("Заявка успешно отправлена!", { name, phone, message });

    return NextResponse.json({ success: true, message: "Заявка отправлена" });

  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}