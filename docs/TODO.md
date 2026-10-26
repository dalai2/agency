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

## Formulario sin Supabase en producción (verificado 26 oct 2026)

El sitio publicado (www.agenciavelant.mx) se construyó **sin** `NEXT_PUBLIC_SUPABASE_URL` ni `NEXT_PUBLIC_SUPABASE_ANON_KEY`: el código usa `placeholder.supabase.co`, así que **todos los envíos del formulario fallan** y ningún lead se guarda. Mientras tanto, el aviso de error ofrece WhatsApp.

- [ ] Crear el proyecto en Supabase y ejecutar `supabase-schema.sql` en el SQL Editor (crea `leads` y la política que permite insertar sin iniciar sesión).
- [ ] En Vercel → Settings → Environment Variables: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] **Volver a desplegar:** las variables `NEXT_PUBLIC_*` se incrustan al construir, no basta con guardarlas.
- [ ] Enviar el formulario desde el sitio publicado y ver el renglón en la tabla `leads`.
- [ ] Hasta entonces, el pixel de Meta no registra `Lead` (solo lo dispara tras guardar con éxito).
- [ ] Decidir cómo enterarse de los leads nuevos (hoy nadie recibe aviso; hay que abrir la tabla).

## WhatsApp

Número corregido en código (`lib/contact.ts`, por defecto 522281580134; `NEXT_PUBLIC_WHATSAPP_NUMBER` lo sobreescribe si se define en el hosting). Falta desplegar para que se vea en el sitio publicado.
