import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. ПРОВЕРКА КАПЧИ НА СЕРВЕРЕ (обязательно!)
    const captchaRes = await fetch(
      'https://smartcaptcha.cloud.yandex.ru/validate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.SMART_CAPTCHA_SECRET_KEY!,
          token: body.captchaToken,
          ip: request.headers.get('x-forwarded-for')?.split(',')[0] || '',
        }).toString(),
      }
    )
    const captchaData = await captchaRes.json()

    if (captchaData.status !== 'ok') {
      return NextResponse.json(
        { error: 'Капча не пройдена' },
        { status: 400 }
      )
    }

    // 2. Сохранение в Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: body.name,
        phone: body.phone,
        message: body.message || null,
      })
      .select()

    if (error) {
      console.error('Supabase Error:', error)
      return NextResponse.json(
        { error: 'Ошибка при сохранении заявки' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (e) {
    console.error('Server Error:', e)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}