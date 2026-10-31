# TODO

## Pixel de Meta y Conversions API (instalado, falta activarlo)

El código ya está: `components/MetaPixel.tsx`, `lib/meta.ts` y `app/api/meta/lead/route.ts`, conectado a los dos formularios (portada y `/contacto`). Sin las variables de entorno no hace nada.

- [ ] Crear el pixel en Meta Events Manager y copiar su ID.
- [ ] Generar el token de acceso para la Conversions API (Events Manager → Configuración).
- [ ] Poner en `.env.local` **y** en el hosting: `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_TOKEN` y, solo mientras pruebas, `META_TEST_EVENT_CODE`.
- [ ] Enviar un formulario real y confirmar en Events Manager → Probar eventos que llega **un** `Lead` (pixel y servidor deduplicados por `event_id`). La llamada real a Meta nunca se ha probado; solo el flujo con un ID falso.
- [ ] Quitar `META_TEST_EVENT_CODE` al terminar de probar.
- [ ] Verificar el dominio `agenciavelant.mx` en Meta.
- [ ] Decidir si se envían correo/teléfono hasheados para mejorar la coincidencia (hoy no se envía ningún dato personal).

## Leads: Neon + aviso por Telegram (hecho en código, falta publicar y el bot)

Los formularios ya no usan Supabase: mandan POST a `/api/leads` (`app/api/leads/route.ts`, `lib/leads.ts`), que guarda en la base Neon `agency-leads` (conectada al proyecto `agency` de Vercel; la tabla `leads` se crea sola la primera vez) y avisa por Telegram. Probado en local contra esa base: guarda, rechaza datos vacíos e ignora el campo trampa.

- [ ] Publicar (push a `main`). Hasta entonces el sitio en producción sigue con el formulario roto.
- [ ] Crear el bot en @BotFather, escribirle un mensaje y obtener tu chat id; poner `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` en Vercel (Production) y volver a desplegar. Sin ellas el lead se guarda pero nadie recibe aviso.
- [ ] Enviar el formulario desde el sitio publicado y confirmar el renglón y el mensaje.
- [ ] El pixel de Meta registra `Lead` solo tras guardar con éxito.
- [ ] `lib/supabase.ts`, `supabase-schema.sql` y la dependencia `@supabase/supabase-js` ya no se usan; se pueden borrar.

## WhatsApp

Número corregido en código (`lib/contact.ts`, por defecto 522281580134; `NEXT_PUBLIC_WHATSAPP_NUMBER` lo sobreescribe si se define en el hosting). Falta desplegar para que se vea en el sitio publicado.
