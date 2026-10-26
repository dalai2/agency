import { NextRequest, NextResponse } from 'next/server';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_TOKEN;
const TEST_CODE = process.env.META_TEST_EVENT_CODE;

// Conversions API: manda el Lead desde el servidor para sobrevivir a bloqueadores.
// No se envían nombre, correo ni teléfono; solo señales de coincidencia (IP, UA, fbp/fbc).
export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !TOKEN) {
    return NextResponse.json({ skipped: true });
  }

  const { eventId, servicio, url, fbp, fbc } = await req.json().catch(() => ({}));
  if (typeof eventId !== 'string') {
    return NextResponse.json({ error: 'eventId requerido' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  const body = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: typeof url === 'string' ? url : undefined,
        user_data: {
          client_ip_address: ip,
          client_user_agent: req.headers.get('user-agent') ?? undefined,
          fbp: typeof fbp === 'string' ? fbp : undefined,
          fbc: typeof fbc === 'string' ? fbc : undefined,
        },
        custom_data: { content_name: typeof servicio === 'string' ? servicio : undefined },
      },
    ],
    ...(TEST_CODE ? { test_event_code: TEST_CODE } : {}),
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${TOKEN}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );

  if (!res.ok) {
    console.error('Meta CAPI error:', res.status, await res.text());
    return NextResponse.json({ error: 'meta' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
