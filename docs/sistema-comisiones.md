# Velant — Sistema de ventas por comisión

Versión 2 (22 oct 2026), con las decisiones del dueño: un solo nivel de vendedor, 15% sobre precio base, sin comisión de mantenimiento, Velant es el único que cobra.

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Niveles | **Uno: vendedor.** Sin referidores aparte |
| Comisión | **15% sobre el precio base** (el precio tachado, antes del descuento) |
| Mantenimiento | **Sin comisión.** Ya se cubre con el proyecto |
| Quién cobra | **Solo Velant**, a su cuenta. El vendedor nunca toca dinero del cliente |
| Reclutamiento | Publicaciones en Reddit y Facebook, sin personas identificadas todavía |
| Servicio a vender | **Solo E-commerce Básico** por ahora (ver `paquete-ecommerce.md`): $1,800 de comisión por venta |
| Bono | **$1,000 por cada 5 ventas** cobradas, sin cancelar tras 30 días y juntadas en 90 días. El monto no se publica en flyers; se revela en la llamada y va en el acuerdo |

## Lo que sale del 15% sobre precio base

Precios base de `app/servicios/page.tsx` (precio normal; en paquetes, precio + ahorro):

| Servicio | Precio base | Precio cobrado | Comisión (15% base) | % real sobre lo cobrado | Velant se queda |
|---|---|---|---|---|---|
| Landing | $5,000 | $2,500 | $750 | **30.0%** | $1,750 |
| Paquete Presencia Digital | $5,000 | $3,500 | $750 | **21.4%** | $2,750 |
| E-commerce básico | $12,000 | $8,000 | $1,800 | **22.5%** | $6,200 |
| Paquete Negocio Completo | $13,000 | $10,000 | $1,950 | **19.5%** | $8,050 |
| Sitio corporativo / Logo | sin descuento | $8,000 / $2,000 | $1,200 / $300 | 15% | normal |

**Lo que hay que mirar antes de fijarlo:** con el descuento de apertura, la comisión real es 20–30% de lo que entra, y en landing el vendedor se lleva casi un tercio. "Lo que Velant se queda" es antes de costo de entrega y de pauta. Si entregar un e-commerce toma, por ejemplo, 40 horas, esos $6,200 se reparten entre tu tiempo, hosting y publicidad.

Es tu decisión y funciona como incentivo fuerte para atraer vendedores. Dos formas de reducir el riesgo sin cambiar el 15%:

- **A. Comisión sobre el precio base, pero con piso de margen**: no se vende por debajo del precio de oferta publicado. Ya está en las reglas.
- **B. Cuando termine la oferta de apertura** el precio cobrado sube hacia el base y la comisión real baja a ~15–19%. La oferta de apertura es la época cara; planéalo como inversión de lanzamiento, no como régimen permanente.

Alternativa que no estoy recomendando por defecto: montos fijos por servicio (p. ej. landing $400, e-commerce $1,500). Más predecible, pero menos simple de explicar.

## Cobro: cómo se evita que alguien cobre en nombre de Velant

Esta es la preocupación principal y se resuelve con estructura, no con confianza:

1. **El vendedor no tiene autoridad para recibir dinero.** Está en el acuerdo, por escrito, y se repite en cada conversación con el cliente.
2. **Dos canales de pago, ambos a nombre de Velant**: **SPEI** (CLABE de Velant) y **Mercado Pago** (link de pago generado por Velant). Se publica en el sitio una línea fija: *"Velant solo recibe pagos por SPEI a la CLABE [____] o por link de Mercado Pago generado por Velant. Verifica con contacto@velant.mx"*. Notas: SPEI es irreversible y sin comisión, así que se confirma en tu propio estado de cuenta; Mercado Pago cobra comisión (verifica la vigente en tu cuenta, afecta el margen) y permite contracargos, por eso la regla de 30 días en reembolsos importa más ahí. Cada link o referencia de pago lo genera Velant, nunca el vendedor.
3. **El vendedor no cotiza ni emite documentos por su cuenta.** Pasa el lead (con su código) y **Velant** manda cotización, contrato y datos de pago. El vendedor acompaña la conversación, no la sustituye.
4. **Comisión solo después de que Velant confirmó el cobro** en su propia cuenta. Si el cliente le pagó a otra persona, esa venta no existe para efectos de comisión.
5. **Velant se entera de todo**: no hay venta sin lead registrado con `ref`, y el cliente recibe confirmación directa de Velant en cada etapa (anticipo recibido, entrega, liquidación). Un cliente que no recibe esa confirmación sabe que algo está mal.
6. **Consecuencia escrita**: si un vendedor recibe dinero a nombre de Velant o promete algo que Velant no entrega, baja inmediata, cero comisiones pendientes y posibilidad de acciones legales.

Esto también protege a los vendedores honestos: nadie puede decir que "se llevaron mi dinero".

## Reglas

1. **Se paga sobre dinero cobrado**, proporcional a cada pago (anticipo/liquidación).
2. **Atribución**: el primer contacto con el código del vendedor vale **60 días**. Si el lead ya existía antes en `leads`, no hay comisión.
3. **Un lead, un dueño**: gana el registro más antiguo.
4. **Cancelaciones/reembolsos** dentro de 30 días: la comisión se revierte o se descuenta de la siguiente.
5. **Pago**: dentro de 7 días de confirmado el cobro, por transferencia.
6. **Sin autoventa**: no se comisiona a sí mismo ni a su propio negocio.
7. **Precio mínimo**: no se puede ofrecer menos que el precio publicado.
8. **Bono por volumen**: $1,000 por cada 5 ventas que cumplan: cobradas en su totalidad, 30 días sin cancelación y dentro de una ventana de 90 días. Se paga con la comisión de la 5.ª venta que cumpla las condiciones, en 7 días. Una venta cuenta para un solo bono.
9. **Sin spam ni promesas falsas** ("tienda en 2 días"); baja inmediata si ocurre.

## Cómo se rastrea (sobre lo que ya existe)

Se extiende `supabase-schema.sql`:

- **`vendedores`**: id, nombre, email, teléfono, `codigo` único (ej. `ANA15`), tasa, activo, datos de pago y fiscales.
- **`leads`**: nuevas columnas `vendedor_id`, `ref_code`, `ref_fecha`.
- **`ventas`**: lead_id, servicio, **precio_base**, precio_cobrado, estado (cotizado → anticipo → entregado → liquidado | cancelado).
- **`comisiones`**: venta_id, vendedor_id, base_comision (= precio base), tasa **congelada al momento de la venta**, monto, estado (pendiente → aprobada → pagada | revertida).
- Link personal: `agenciavelant.mx/?ref=ANA15` guarda el código 60 días y el formulario lo manda con el lead. Fallback: pregunta "¿quién te recomendó?" en el formulario y en WhatsApp.
- **Seguridad**: las políticas RLS actuales dejan a cualquier usuario autenticado leer todos los leads. Antes de dar acceso a vendedores hay que restringir por `vendedor_id`.

## Reclutamiento sin conocidos: Reddit y Facebook

Sin personas identificadas, el reclutamiento es el cuello de botella. Un sistema sin vendedores no vende:

- **Filtro antes de dar código**: formulario corto (experiencia vendiendo, ciudad, cómo conseguiría clientes, RFC o disposición a facturar) y una llamada de 10 min. No dar código a quien solo se registra.
- **Piloto de 3 personas, no apertura masiva.** Con 3 se descubre qué falla en las reglas antes de que sea un problema de 30.
- **Qué publicar**: oferta clara y honesta: qué se vende, qué gana el vendedor (con un ejemplo en pesos), que no hay cuota ni inversión, y que Velant cobra directo. Evita "gana dinero fácil": atrae a quien no sirve y suena a esquema.
- **Reglas de cada plataforma**: muchos subreddits y grupos prohíben reclutamiento o autopromoción; revisa las reglas de cada uno antes de publicar o te borran y pueden banear.
- **Sin experiencia comprobable**, la mejor señal es qué tan bien entienden la oferta en la llamada.

## Fiscal y legal (confirmar con contador)

- Pagar comisiones exige que el vendedor expida comprobante (CFDI de honorarios o RESICO) y que Velant revise retenciones. Consultar antes del primer pago, **y pedirlo en el reclutamiento** para no descubrirlo después.
- Acuerdo de comisión de 1 página firmado (tasas, atribución, devoluciones, sin cobro del vendedor, confidencialidad). Que **no sea relación laboral** requiere que el vendedor sea independiente (sin horario ni sueldo): confirmarlo con abogado o contador.

## Fases

1. **Esta semana, sin código**: acuerdo de 1 página, hoja de cálculo de ventas/comisiones, línea de "solo pagos a la cuenta de Velant" en el sitio, formulario de alta de vendedor.
2. **Siguiente**: tablas + `?ref=` + guardar código en `leads`, ajustar RLS.
3. **Después**: panel del vendedor y reporte de costo por adquisición por canal.

## Costo de entrega (por estimar)

No hay dato todavía. Para obtenerlo basta una estimación honesta de horas por servicio; el costo ≈ horas × lo que vale tu hora + extras (dominio, licencias, comisión de Mercado Pago ~ el % vigente):

| Servicio | Horas reales (tú) | Extras $ | Costo estimado | Margen tras comisión |
|---|---|---|---|---|
| Landing ($2,500, comisión $750) | ? | ? | ? | $1,750 − costo |
| E-commerce ($8,000, comisión $1,800) | ? | ? | ? | $6,200 − costo |
| Presencia Digital ($3,500, comisión $750) | ? | ? | ? | $2,750 − costo |
| Negocio Completo ($10,000, comisión $1,950) | ? | ? | ? | $8,050 − costo |

Hasta llenar esa tabla, la recomendación es vender el piloto con **máximo 3 ventas**: la primera entrega da las horas reales mejor que cualquier estimado.

## Pendiente de decidir

- ¿Mantener el 15% sobre precio base en toda la vida del programa o solo mientras dure la oferta de apertura? (ver efecto arriba)
- Horas reales por servicio (se mide con las primeras 1–3 entregas).
- CLABE de Velant y cuenta de Mercado Pago que se publicarán.
