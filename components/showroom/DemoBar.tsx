'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { CATALOGO, hrefDe, vecinos } from '@/lib/showroom/catalogo';
import { whatsappUrl } from '@/lib/contact';

/**
 * Barra fija de la demo (no forma parte de la landing): permite saltar a cualquier
 * otro estilo sin volver a la galería y concentra el CTA de Velant.
 */
export default function DemoBar({ vert, estilo }: { vert: string; estilo: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { i, n, prev, next } = vecinos(vert, estilo);
  const cur = CATALOGO[i];

  // Cerrar el selector al cambiar de demo.
  useEffect(() => setOpen(false), [pathname]);

  // Teclado: ← → cambian de demo, Esc cierra el selector.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') router.push(hrefDe(prev));
      if (e.key === 'ArrowRight') router.push(hrefDe(next));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router, prev, next]);

  const wa = whatsappUrl(
    `Hola, vi la demo "${cur.brand}" (${cur.vNombre} · estilo ${cur.sNombre}, ${hrefDe(cur)}) en el showroom de Velant y quiero una página así para mi negocio.`,
  );
  const grupos = Array.from(new Set(CATALOGO.map((c) => c.vert)));

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex h-12 items-center gap-2 bg-[#111] px-3 text-white sm:px-4">
        <Link href="/showroom" aria-label="Volver a la galería" className="flex items-center gap-1.5 rounded px-2 py-1.5 text-xs opacity-80 hover:bg-white/10 hover:opacity-100">
          <ArrowLeft size={15} /> <span className="hidden sm:inline">Galería</span>
        </Link>

        <div className="mx-auto flex min-w-0 items-center gap-1">
          <Link href={hrefDe(prev)} aria-label={`Anterior: ${prev.brand} ${prev.sNombre}`} title="Anterior (←)" className="rounded p-1.5 hover:bg-white/10">
            <ChevronLeft size={18} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="demo-selector"
            className="flex min-w-0 items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15 sm:text-sm"
          >
            <span className="hidden truncate font-semibold sm:inline">{cur.brand}</span>
            <span className="hidden opacity-60 sm:inline">·</span>
            <span className="truncate font-semibold sm:font-normal sm:opacity-80">{cur.sNombre}</span>
            <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] tabular-nums opacity-80">{i + 1}/{n}</span>
            <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <Link href={hrefDe(next)} aria-label={`Siguiente: ${next.brand} ${next.sNombre}`} title="Siguiente (→)" className="rounded p-1.5 hover:bg-white/10">
            <ChevronRight size={18} />
          </Link>
        </div>

        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-[#06260F] transition-colors hover:bg-[#3be07a] sm:text-sm"
        >
          <MessageCircle size={15} />
          <span className="sm:hidden">La quiero</span>
          <span className="hidden sm:inline">Quiero esta página</span>
        </a>
      </div>

      {open && (
        <>
          <button type="button" aria-label="Cerrar selector" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default bg-black/40" />
          <div id="demo-selector" className="fixed inset-x-0 top-12 z-50 max-h-[calc(100vh-3rem)] overflow-y-auto bg-[#111] px-4 pb-5 pt-2 text-white shadow-2xl sm:left-1/2 sm:right-auto sm:w-[640px] sm:-translate-x-1/2 sm:rounded-b-xl">
            {grupos.map((g) => {
              const items = CATALOGO.filter((c) => c.vert === g);
              return (
                <div key={g} className="border-b border-white/10 py-3 last:border-0">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm font-semibold">{items[0].vNombre}</span>
                    <span className="text-xs opacity-50">{items[0].brand}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {items.map((c) => {
                      const activo = c.vert === vert && c.estilo === estilo;
                      return (
                        <Link
                          key={c.estilo}
                          href={hrefDe(c)}
                          aria-current={activo ? 'page' : undefined}
                          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition-colors sm:text-sm ${activo ? 'border-white bg-white/15' : 'border-white/10 hover:border-white/40 hover:bg-white/5'}`}
                        >
                          <span className="flex shrink-0">
                            {c.colors.map((col, k) => (
                              <i key={k} className={`h-3.5 w-3.5 rounded-full border border-white/30 sm:-ml-1 sm:first:ml-0 ${k === 1 ? '' : 'hidden sm:block'}`} style={{ background: col }} />
                            ))}
                          </span>
                          <span className="truncate">{c.sNombre}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <p className="pt-3 text-center text-[11px] opacity-50">Tip: usa las flechas ← → del teclado para recorrer las demos</p>
          </div>
        </>
      )}
    </>
  );
}
