import { neon } from '@neondatabase/serverless';

export type NewLead = {
  nombre: string;
  email: string;
  telefono: string | null;
  servicio_interes: string;
  mensaje: string | null;
};

let tableReady: Promise<unknown> | null = null;

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL no está configurada');
  return neon(url);
}

// La tabla se crea sola la primera vez, así no hace falta correr migraciones a mano.
function ensureTable() {
  tableReady ??= sql()`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      telefono TEXT,
      servicio_interes TEXT,
      mensaje TEXT,
      status TEXT NOT NULL DEFAULT 'nuevo',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `.catch((e) => {
    tableReady = null;
    throw e;
  });
  return tableReady;
}

export async function saveLead(lead: NewLead) {
  await ensureTable();
  await sql()`
    INSERT INTO leads (nombre, email, telefono, servicio_interes, mensaje)
    VALUES (${lead.nombre}, ${lead.email}, ${lead.telefono}, ${lead.servicio_interes}, ${lead.mensaje})
  `;
}

// Aviso por Telegram. Si falla, el lead ya quedó guardado: nunca debe romper el envío.
export async function notifyLead(lead: NewLead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    'Nuevo lead en agenciavelant.mx',
    `Nombre: ${lead.nombre}`,
    `Contacto: ${lead.email}${lead.telefono ? ` / ${lead.telefono}` : ''}`,
    `Servicio: ${lead.servicio_interes}`,
    lead.mensaje ? `Mensaje: ${lead.mensaje}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (e) {
    console.error('Aviso de Telegram falló:', e);
  }
}
