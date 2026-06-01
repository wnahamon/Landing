import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message, captchaToken } = body;

    // 1️⃣ Проверка капчи (ОБЯЗАТЕЛЬНО до работы с БД)
    if (!captchaToken) {
      return NextResponse.json(
        { error: "Требуется проверка капчи" },
        { status: 400 },
      );
    }

    const captchaRes = await fetch(
      "https://smartcaptcha.yandexcloud.net/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.YANDEX_SMARTCAPTCHA_SECRET!,
          token: captchaToken,
        }),
      },
    );

    const captchaData = await captchaRes.json();

    if (captchaData.status !== "ok") {
      console.warn("Captcha validation failed:", captchaData);
      return NextResponse.json(
        { error: "Не удалось пройти проверку капчи" },
        { status: 400 },
      );
    }

    // 2️⃣ Опционально: проверка score (если нужно)
    // if (captchaData.score < 0.5) { ... }

    // 3️⃣ Сохранение в Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        phone,
        message,
        // captcha_verified: true, // можно добавить поле в таблицу
      })
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: "Ошибка при сохранении заявки" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("Server Error:", e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
