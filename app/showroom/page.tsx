import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ESTILOS } from '@/lib/showroom/estilos';
import { VERTICALES } from '@/lib/showroom/verticales';
import type { Style, Vertical } from '@/lib/showroom/types';
import { whatsappUrl } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Showroom de landing pages | VELANT',
  description: 'Cuatro tipos de negocio, tres estilos cada uno. Elige el que se parezca a tu marca y lo adaptamos.',
};

const HERO_LABEL: Record<Style['hero'], string> = { split: 'Hero dividido', center: 'Hero centrado', bleed: 'Hero a sangre' };
const GRID_LABEL: Record<Style['grid'], string> = { cards: 'Tarjetas', tiles: 'Mosaico', list: 'Lista' };

function Preview({ v, s }: { v: Vertical; s: Style }) {
  const t = s.t;
  const dark = t.heroBg ?? t.bg;
  return (
    <div className="relative aspect-[16/11] overflow-hidden" style={{ background: dark, color: t.heroInk ?? t.ink }}>
      <div className="flex items-center justify-between px-4 py-3 text-[10px]" style={{ fontFamily: t.heading, fontWeight: t.headingWeight, textTransform: t.headingCase }}>
        <span>{v.brand}</span>
        <span className="rounded-full px-2 py-0.5" style={{ background: t.accent, color: t.accentInk }}>•••</span>
      </div>
      <div className="px-4 pt-3">
        <div className="line-clamp-2 max-w-[75%] text-[24px] leading-[1.05]" style={{ fontFamily: t.heading, fontWeight: t.headingWeight, textTransform: t.headingCase, letterSpacing: t.tracking }}>
          {v.hero.title}
        </div>
        <div className="mt-2 h-1.5 w-2/3 rounded-full opacity-30" style={{ background: t.heroInk ?? t.ink }} />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full opacity-20" style={{ background: t.heroInk ?? t.ink }} />
        <div className="mt-4 inline-block px-3 py-1.5 text-[9px] font-semibold" style={{ background: t.accent, color: t.accentInk, borderRadius: t.btn === 'pill' ? 999 : t.radius, border: t.hard ? `2px solid ${t.ink}` : undefined, boxShadow: t.hard ? `3px 3px 0 ${t.ink}` : undefined }}>
          {v.hero.cta}
        </div>
      </div>
      <div className="absolute -bottom-6 right-4 h-24 w-20" style={{ background: t.accent, opacity: 0.85, borderRadius: s.art === 'arch' ? '999px 999px 0 0' : s.art === 'circle' ? '999px' : t.radius }} />
      <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: t.surface }} />
    </div>
  );
}

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
            {VERTICALES.length} tipos de negocio, 3 estilos cada uno. Abre cualquiera, recórrela completa en tu celular y dinos
            cuál se acerca más: la adaptamos con tu marca, fotos y datos reales.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {VERTICALES.map((v) => (
              <a key={v.slug} href={`#${v.slug}`} className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
                {v.nombre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {VERTICALES.map((v) => (
        <section key={v.slug} id={v.slug} className="mx-auto max-w-[1180px] scroll-mt-24 px-8 py-16">
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary">{v.nombre}</h2>
              <p className="mt-2 max-w-xl text-primary/70">{v.resumen}</p>
            </div>
            <p className="text-sm text-primary/50">Demo con la marca ficticia “{v.brand}”</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(ESTILOS[v.slug] ?? []).map((s) => (
              <Link
                key={s.slug}
                href={`/showroom/${v.slug}/${s.slug}`}
                className="group overflow-hidden rounded-xl border border-[#dbe6e8] bg-white transition-shadow hover:shadow-xl"
              >
                <Preview v={v} s={s} />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">{s.nombre}</h3>
                    <ArrowRight size={18} className="text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-2 text-sm text-primary/70">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-primary/60">
                    <span className="rounded bg-[#F0F7F7] px-2 py-1">{HERO_LABEL[s.hero]}</span>
                    <span className="rounded bg-[#F0F7F7] px-2 py-1">{GRID_LABEL[s.grid]}</span>
                    <span className="ml-auto flex gap-1">
                      {[s.t.bg, s.t.accent, s.t.ink].map((c, i) => (
                        <i key={i}className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: c }} />
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
