import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Используем SECRET KEY на сервере!
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // <-- Важно: service role key
    )

    const { data, error } = await supabase
      .from('leads') 
      .insert({
        name: body.name,
        phone: body.phone,
        message: body.message
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
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}