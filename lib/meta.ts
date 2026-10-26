declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function cookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${name}=`))
    ?.split('=')[1];
}

// El mismo event_id va al pixel y a la Conversions API: Meta los cuenta como UNO.
export function trackLead(servicio: string) {
  const eventId = crypto.randomUUID();

  window.fbq?.('track', 'Lead', { content_name: servicio }, { eventID: eventId });

  // fire-and-forget: un fallo aquí nunca debe romper el envío del formulario.
  fetch('/api/meta/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventId,
      servicio,
      url: window.location.href,
      fbp: cookie('_fbp'),
      fbc: cookie('_fbc'),
    }),
    keepalive: true,
  }).catch(() => {});
}
