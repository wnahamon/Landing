// app/api/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 🔥 Интерфейс для Бипиума (имена как в настройках сценария!)
interface BpiumLead {
  Name: string;
  NumberPhone: string;
  Message: string;
}

// Функция отправки в Бипиум
async function sendToBpium(lead: BpiumLead) {
  const response = await fetch('https://ieboldarev.bpium.ru/api/webrequest/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Bipium error: ${error}`);
  }
  
  return await response.json();
}

// 🔥 ЭКСПОРТ POST — ОБЯЗАТЕЛЬНО для Next.js App Router!
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 🔥 Маппинг: поля формы → поля Бипиума
    const leadData: BpiumLead = {
      Name: body.name,              // форма: name → Бипиум: Name
      NumberPhone: body.phone,      // форма: phone → Бипиум: NumberPhone
      Message: body.message || '',  // форма: message → Бипиум: Message
    };
    
    const result = await sendToBpium(leadData);
    
    return NextResponse.json({ success: true, data: result });
    
  } catch (error) {
    console.error('❌ Error sending lead:', error);
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ошибка сервера' },
      { status: 500 }
    );
  }
}