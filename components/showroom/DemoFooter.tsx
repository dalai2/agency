import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { CATALOGO, hrefDe, vecinos } from '@/lib/showroom/catalogo';
import { whatsappUrl } from '@/lib/contact';

/** Cierre de la demo: convierte (CTA de Velant) o sigue recorriendo (anterior/siguiente). */
export default function DemoFooter({ vert, estilo }: { vert: string; estilo: string }) {
  const { i, prev, next } = vecinos(vert, estilo);
  const cur = CATALOGO[i];
  const wa = whatsappUrl(
    `Hola, vi la demo "${cur.brand}" (${cur.vNombre} · estilo ${cur.sNombre}, ${hrefDe(cur)}) en el showroom de Velant y quiero una página así para mi negocio.`,
  );

  return (
    <section className="bg-[#111] px-6 py-14 text-white md:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/50">Velant · Landing pages</p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">¿Te gustó esta? Puede ser tu página.</h2>
            <p className="mt-3 text-white/70">
              La adaptamos con tu logo, colores, fotos y datos. Escríbenos por WhatsApp y te respondemos con una propuesta.
            </p>
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#25D366] px-7 py-4 text-base font-semibold text-[#06260F] transition-colors hover:bg-[#3be07a]"
          >
            <MessageCircle size={20} /> Quiero esta página
          </a>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
          {[
            { c: prev, dir: 'prev' as const },
            { c: next, dir: 'next' as const },
          ].map(({ c, dir }) => (
            <Link
              key={dir}
              href={hrefDe(c)}
              className={`group flex items-center gap-4 rounded-xl border border-white/10 p-4 transition-colors hover:border-white/40 hover:bg-white/5 ${dir === 'next' ? 'sm:flex-row-reverse sm:text-right' : ''}`}
            >
              {dir === 'prev' ? <ArrowLeft size={18} className="shrink-0 transition-transform group-hover:-translate-x-1" /> : <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />}
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-wider text-white/50">{dir === 'prev' ? 'Anterior' : 'Siguiente'}</span>
                <span className="mt-0.5 block truncate font-semibold">{c.brand} · {c.sNombre}</span>
                <span className="block truncate text-sm text-white/60">{c.vNombre}</span>
              </span>
              <span className="hidden shrink-0 sm:flex">
                {c.colors.map((col, k) => (
                  <i key={k} className="-ml-1.5 h-5 w-5 rounded-full border border-white/30 first:ml-0" style={{ background: col }} />
                ))}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/showroom" className="text-white/60 underline-offset-4 hover:text-white hover:underline">Ver la galería completa</Link>
        </p>
      </div>
    </section>
  );
}
