// Número de WhatsApp del negocio (formato wa.me: 52 + 10 dígitos, sin "+" ni espacios).
// NEXT_PUBLIC_WHATSAPP_NUMBER lo sobreescribe si se configura en el hosting.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '522281580134';

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
