import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { notifyLead, saveLead } from '@/lib/leads';

const schema = z.object({
  nombre: z.string().trim().min(1).max(200),
  // Puede ser un correo o un WhatsApp (el formulario de la portada acepta cualquiera de los dos).
  email: z.string().trim().min(1).max(200),
  telefono: z.string().trim().max(30).nullish(),
  servicio_interes: z.string().trim().min(1).max(100),
  mensaje: z.string().trim().max(5000).nullish(),
  // Campo trampa: las personas no lo ven ni lo llenan.
  sitio_web: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }
  const { sitio_web, ...data } = parsed.data;

  // Un bot que llenó la trampa recibe "ok" para que no reintente, pero no se guarda nada.
  if (sitio_web) return NextResponse.json({ ok: true });

  const lead = {
    nombre: data.nombre,
    email: data.email,
    telefono: data.telefono || null,
    servicio_interes: data.servicio_interes,
    mensaje: data.mensaje || null,
  };

  try {
    await saveLead(lead);
  } catch (e) {
    console.error('No se pudo guardar el lead:', e);
    return NextResponse.json({ error: 'No se pudo guardar' }, { status: 500 });
  }

  await notifyLead(lead);
  return NextResponse.json({ ok: true });
}
