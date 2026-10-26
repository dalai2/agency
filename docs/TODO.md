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
