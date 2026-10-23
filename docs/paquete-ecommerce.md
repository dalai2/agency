# Velant — Paquete E-commerce Básico

Versión 1 (22 oct 2026). Alcance del único servicio que venden los vendedores por ahora. Complementa `sistema-comisiones.md`. Los vendedores **no** ofrecen Negocio Completo, Landing ni otros servicios de momento.

## Precio y plazo

- **$8,000** de oferta de lanzamiento (precio base $12,000, sobre el que se calcula la comisión de 15% = $1,800).
- **Entrega: 7–10 días hábiles contados desde que el cliente entrega todos los insumos**, no desde el anticipo. Sin insumos completos el reloj no arranca.
- Anticipo 50% al firmar, 50% al publicar (propuesto, por confirmar).

## Qué incluye

- Hasta 50 productos.
- Cobro con **Mercado Pago** (tarjeta, OXXO, SPEI y lo que ofrezca la cuenta del cliente).
- Panel de administración, inventario y carrito.
- Envíos: ver sección abajo.
- Diseño responsive y SEO básico.
- **Dominio y hosting incluidos**: un solo dominio, a elegir entre `.com`, `.mx` o `.com.mx`.
- Capacitación.
- 2 rondas de revisiones.

## Qué se cobra aparte

Regla general: **todo lo que no está en la lista de arriba se cotiza y se cobra aparte.** Casos ya previstos:

- **Comisión de Mercado Pago** por cada venta de la tienda: la paga el cliente (dueño de la tienda), nunca Velant ni el vendedor.
- **Costo de cada envío** (tarifa de paquetería): lo paga el comprador final o el dueño de la tienda, según la política que él elija.
- Productos más allá de 50.
- Revisiones extra después de las 2 rondas.
- Dominio adicional o de otra extensión.
- Renovación de dominio y hosting después del periodo incluido.
- Fotografía de producto, logo, redacción de contenido.
- Mantenimiento mensual ($500/mes, opcional).

## Envíos: recomendación

**No integrar DHL directo.** La API directa de DHL exige cuenta con contrato y las tarifas de un negocio chico suelen ser las de mostrador. Mejor un **agregador de paquetería mexicano** (por ejemplo Skydropx o Envía.com): una sola integración da DHL, Estafeta, FedEx, Paquetexpress y otras, con tarifas negociadas, cotización en vivo y guías impresas. DHL queda disponible dentro del agregador, que es lo que se buscaba.

Dos niveles, para no atorar la entrega:

1. **Incluido en el paquete (v1):** envío por tarifa fija o por zona, configurable en el panel, con opción de envío gratis desde cierto monto. El dueño genera la guía en el panel del agregador.
2. **Extra cotizable:** cotización en vivo en el checkout con el agregador (depende del peso y medidas de cada producto, así que exige que el cliente los capture).

**Por verificar antes de prometerlo:** condiciones, comisiones y calidad de la API de cada agregador. No lo he consultado; lo verifico antes de ponerlo en la hoja del vendedor.

## Bono por volumen

- **$1,000 por cada 5 ventas** (decidido 22 oct 2026). Con 5 tiendas: $9,000 de comisión + $1,000 = $10,000 (16.7% del precio base; 25% de lo cobrado con la oferta de lanzamiento).
- Cuenta solo si las 5 ventas están **cobradas y ya pasaron los 30 días de cancelación**, y se juntan **dentro de 90 días**.
- Se paga junto con la comisión de la 5.ª venta que cumpla las condiciones, en 7 días.
- **No se publica el monto**: en los flyers solo dice "bono cada 5 ventas" para generar curiosidad. Se revela en la llamada de 10 minutos y va por escrito en el acuerdo de comisión.
- Pendiente de añadir al acuerdo de comisión de `sistema-comisiones.md` (hoy no lo menciona).

## Qué recibe cada parte

| Etapa | Vendedor | Cliente |
|---|---|---|
| Antes de vender | Hoja de una página del paquete (incluye / no incluye / cobrado aparte), acuerdo de comisión, código y link `?ref=`, lista de cosas que no puede prometer | — |
| Cotización | Aviso de que Velant cotizó | Cotización de Velant: alcance, precio, plazo, extras aparte, datos de pago de Velant (SPEI o link de Mercado Pago) |
| Antes de arrancar | Confirmación del anticipo | Contrato, formulario de insumos, confirmación del anticipo |
| Desarrollo | Estado de su venta | Entregas parciales y 2 rondas de revisión |
| Lanzamiento | Aviso de entrega y liquidación | Tienda publicada, accesos, capacitación, dominio y hosting a su nombre |
| Después | Comisión en 7 días tras el cobro | Mantenimiento opcional |

## Formulario de insumos (lo que el cliente entrega antes de arrancar)

- Nombre del negocio y logo (o se cotiza aparte).
- Catálogo: nombre, descripción, precio, fotos y existencias por producto (máx. 50).
- Dominio deseado y extensión (`.com`, `.mx` o `.com.mx`), con 2–3 opciones por si está tomado.
- Cuenta de Mercado Pago del cliente (la tienda cobra a **su** cuenta).
- Datos de contacto y datos fiscales si pide factura.
- Política de envíos y devoluciones: zonas, tarifas, gratis desde X monto.
- Redes sociales.

## Lo que el vendedor NO puede prometer

- Plazos fuera de 7–10 días hábiles desde insumos completos.
- Más de 50 productos, revisiones ilimitadas o cualquier extra "incluido".
- Ventas, tráfico o resultados.
- Recibir pagos o dar datos de pago (solo Velant cobra).

## Pendiente de decidir

1. **Cuánto dura "hosting y dominio incluidos"**: supuesto de este documento, primer año; después se renueva a cargo del cliente. Hay que confirmar y calcular el costo real de ambos para Velant, porque cada tienda vendida deja un costo recurrente.
2. ~~Titular del dominio~~ **Decidido:** Velant lo registra por comodidad, pero el contrato dice que el dominio es del cliente y que Velant se lo transfiere sin costo cuando lo pida, si está al corriente. Así no queda retenido.
3. Agregador de paquetería a usar.
4. Anticipo 50/50 o distinto.
5. Qué pasa con el hosting si el cliente deja de pagar la renovación.
6. Si el mantenimiento ($500/mes) cubre la renovación de dominio y hosting tras el primer año, o se cobra por separado.
