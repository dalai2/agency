import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATALOGO, VERTIENTES, hrefDe, miniaturaDe } from '@/lib/showroom/catalogo';
import { whatsappUrl } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Showroom de landing pages | VELANT',
  description: 'Cuatro tipos de negocio, tres diseños distintos cada uno. Elige el que se parezca a tu marca y lo adaptamos.',
};

export default function ShowroomPage() {
  return (
    <div className="bg-white pt-[72px]">
      <section className="bg-[#F0F7F7]">
        <div className="mx-auto max-w-[1180px] px-8 py-16 md:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Showroom</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-primary md:text-6xl">
            Landing pages listas para parecerse a tu negocio
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary/75">
            {VERTIENTES.length} tipos de negocio, {CATALOGO.length / VERTIENTES.length} diseños distintos cada uno: no solo cambia el color, cambia la forma de contar tu negocio.
            Abre cualquiera, recórrela completa en tu celular y dinos cuál se acerca más: la adaptamos con tu marca, fotos y datos reales.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {VERTIENTES.map((v) => (
              <a key={v.slug} href={`#${v.slug}`} className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
                {v.nombre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {VERTIENTES.map((v) => (
        <section key={v.slug} id={v.slug} className="mx-auto max-w-[1180px] scroll-mt-24 px-8 py-16">
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary">{v.nombre}</h2>
              <p className="mt-2 max-w-xl text-primary/70">{v.resumen}</p>
            </div>
            <p className="text-sm text-primary/50">Demo con la marca ficticia “{v.brand}”</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {CATALOGO.filter((c) => c.vert === v.slug).map((c) => (
              <Link
                key={c.estilo}
                href={hrefDe(c)}
                className="group overflow-hidden rounded-xl border border-[#dbe6e8] bg-white transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#F0F7F7]">
                  <Image
                    src={miniaturaDe(c)}
                    alt={`Vista previa de la landing ${c.sNombre} de ${c.brand}`}
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">{c.sNombre}</h3>
                    <ArrowRight size={18} className="text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-2 text-sm text-primary/70">{c.desc}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-primary/60">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded bg-[#F0F7F7] px-2 py-1">{t}</span>
                    ))}
                    <span className="ml-auto flex gap-1" aria-hidden="true">
                      {c.colors.map((col, i) => (
                        <i key={i} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: col }} />
                      ))}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-primary text-white">
        <div className="mx-auto max-w-[1180px] px-8 py-16 text-center">
          <h2 className="text-3xl font-bold">¿Ves una que se parece a lo tuyo?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Dinos cuál y la adaptamos a tu negocio. Si tu giro no está aquí, también lo hacemos.
          </p>
          <a
            href={whatsappUrl('Hola, vi el showroom de Velant y quiero una landing page para mi negocio.')}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-[#F0F7F7]"
          >
            Cotizar mi landing <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
