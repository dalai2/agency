import { ESTILOS } from './estilos';
import { VERTICALES } from './verticales';

export type CatItem = {
  vert: string;
  vNombre: string;
  brand: string;
  estilo: string;
  sNombre: string;
  colors: [string, string, string]; // fondo, acento, tinta (para las muestras)
};

/** Las 12 demos en orden de recorrido (vertiente por vertiente). Serializable para el cliente. */
export const CATALOGO: CatItem[] = VERTICALES.flatMap((v) =>
  (ESTILOS[v.slug] ?? []).map((s) => ({
    vert: v.slug,
    vNombre: v.nombre,
    brand: v.brand,
    estilo: s.slug,
    sNombre: s.nombre,
    colors: [s.t.bg, s.t.accent, s.t.ink] as [string, string, string],
  })),
);

export const hrefDe = (c: Pick<CatItem, 'vert' | 'estilo'>) => `/showroom/${c.vert}/${c.estilo}`;

/** Anterior y siguiente en el recorrido circular. */
export function vecinos(vert: string, estilo: string) {
  const i = Math.max(0, CATALOGO.findIndex((c) => c.vert === vert && c.estilo === estilo));
  const n = CATALOGO.length;
  return { i, n, prev: CATALOGO[(i - 1 + n) % n], next: CATALOGO[(i + 1) % n] };
}
