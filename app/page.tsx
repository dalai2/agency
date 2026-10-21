import React from 'react';
import Link from 'next/link';
import HomeContactForm from '@/components/HomeContactForm';

const eyebrow = 'font-exo2 text-[13px] font-bold tracking-[0.18em] uppercase';
const sectionTitle =
  'font-exo2 font-extrabold uppercase leading-[1.1] text-[clamp(30px,4vw,44px)]';
const container = 'mx-auto max-w-[1180px] px-8';

const stats = [
  { value: '3–10', label: 'días de entrega' },
  { value: 'MXN', label: 'precios y cobros en pesos' },
  { value: '< 2 h', label: 'tiempo de respuesta' },
];

const steps = [
  { n: '01', t: 'Consulta inicial', d: 'Conversamos sobre tu negocio, tus productos y tus objetivos de venta.' },
  { n: '02', t: 'Propuesta y cotización', d: 'Recibes una propuesta con tiempos y costos claros en pesos.' },
  { n: '03', t: 'Desarrollo', d: 'Construimos tu tienda con entregas parciales para tu revisión.' },
  { n: '04', t: 'Lanzamiento', d: 'Publicamos tu tienda y te damos soporte continuo.' },
];

const posts = [
  { tag: 'Pagos', t: 'Cómo aceptar OXXO, SPEI y tarjeta en tu tienda', d: 'Qué métodos de pago esperan tus clientes en México y cómo activarlos.' },
  { tag: 'Logística', t: 'Envíos a todo el país sin perder margen', d: 'Opciones de paquetería y cómo calcular el costo de envío por zona.' },
  { tag: 'Ventas', t: 'Tu primera tienda en línea: lista de lanzamiento', d: 'Lo mínimo que necesitas revisar antes de recibir tu primer pedido.' },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden pt-[73px]">
      {/* Hero */}
      <section className="bg-primary text-white">
        <div
          className={`${container} grid items-center gap-14 pb-[88px] pt-24`}
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))' }}
        >
          <div>
            <div className={`${eyebrow} mb-6 text-secondary/90`}>E-commerce para PyMEs en México</div>
            <h1 className="mb-6 font-exo2 font-extrabold uppercase leading-[1.04] text-balance text-[clamp(38px,5.4vw,66px)]">
              Tu tienda en línea en días, no meses
            </h1>
            <p className="mb-9 max-w-[500px] text-lg leading-[1.65] text-secondary">
              Diseñamos y lanzamos tiendas listas para vender, con pagos en pesos, envíos a todo el país y soporte en español.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/contacto"
                className="rounded-md bg-secondary px-7 py-[15px] font-semibold text-primary transition-colors hover:bg-white"
              >
                Solicitar cotización
              </Link>
              <Link
                href="#proceso"
                className="rounded-md border-[1.5px] border-secondary px-7 py-3.5 font-semibold text-secondary transition-colors hover:bg-secondary/10"
              >
                Ver cómo trabajamos
              </Link>
            </div>
          </div>
          {/* Placeholder: reemplazar por una captura real de una tienda en celular y laptop */}
          <div
            className="flex aspect-[5/4] items-end rounded-[10px] border border-secondary/25 p-[18px] font-mono text-xs text-secondary"
            style={{ background: 'repeating-linear-gradient(135deg,#355064 0 14px,#2E4354 14px 28px)' }}
          >
            [ captura de tienda en celular y laptop ]
          </div>
        </div>
        <div className="border-t border-secondary/20">
          <div
            className={`${container} grid gap-6 py-7`}
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))' }}
          >
            {stats.map((s) => (
              <div key={s.value}>
                <div className="font-exo2 text-[32px] font-extrabold">{s.value}</div>
                <div className="text-sm text-secondary">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="scroll-mt-[73px] bg-secondary">
        <div className={`${container} py-24`}>
          <div className={`${eyebrow} mb-3.5`}>Proceso</div>
          <h2 className={`${sectionTitle} mb-14 max-w-[640px]`}>Simple, transparente y eficiente</h2>
          <div
            className="grid border-t-2 border-primary"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))' }}
          >
            {steps.map((s) => (
              <div key={s.n} className="pb-2 pr-7 pt-7">
                <div className="mb-[18px] font-exo2 text-[56px] font-extrabold leading-none opacity-[0.22]">{s.n}</div>
                <h3 className="mb-2.5 font-exo2 text-[21px] font-bold">{s.t}</h3>
                <p className="m-0 text-[15px] leading-[1.65] text-[#44596a]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="scroll-mt-[73px] bg-white">
        <div className={`${container} py-24`}>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className={`${eyebrow} mb-3.5`}>Blog</div>
              <h2 className={sectionTitle}>Ideas para vender más en línea</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold hover:text-black">
              Ver todos los artículos →
            </Link>
          </div>
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))' }}
          >
            {posts.map((p) => (
              <Link key={p.t} href="/blog" className="block text-primary">
                {/* Placeholder: reemplazar por la imagen del artículo */}
                <div
                  className="mb-[18px] flex aspect-[16/10] items-end rounded-lg p-3 font-mono text-[11px]"
                  style={{ background: 'repeating-linear-gradient(135deg,#F0F7F7 0 12px,#e3eef0 12px 24px)' }}
                >
                  [ imagen del artículo ]
                </div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] opacity-75">{p.tag}</div>
                <h3 className="mb-2 font-exo2 text-[21px] font-bold leading-tight">{p.t}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-[#44596a]">{p.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="scroll-mt-[73px] bg-primary text-white">
        <div
          className={`${container} grid gap-16 py-24`}
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))' }}
        >
          <div>
            <div className={`${eyebrow} mb-3.5`}>Contacto</div>
            <h2 className="mb-5 font-exo2 font-extrabold uppercase leading-[1.1] text-[clamp(30px,4vw,46px)]">
              ¿Listo para abrir tu tienda?
            </h2>
            <p className="mb-8 max-w-[420px] text-[17px] leading-[1.65] text-secondary">
              Cuéntanos de tu negocio. Te respondemos con una propuesta, tiempos y costos claros. Sin compromiso.
            </p>
            <div className="text-[15px] leading-loose">
              <div>contacto@velant.mx</div>
              <div>Veracruz, México</div>
            </div>
          </div>
          <div className="rounded-[10px] bg-secondary p-8 text-primary">
            <HomeContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
