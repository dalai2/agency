/** Catálogo del showroom: 4 vertientes × 3 conceptos de landing. Solo datos (lo usa también el cliente). */

export type Vertiente = { slug: string; nombre: string; resumen: string; brand: string };

export type Concepto = {
  vert: string;
  vNombre: string;
  brand: string;
  estilo: string;
  sNombre: string;
  desc: string;
  tags: string[];
  colors: [string, string, string]; // fondo, acento, contraste (muestras)
};

export const VERTIENTES: Vertiente[] = [
  { slug: 'tienda', nombre: 'Tienda en línea', resumen: 'Para quien vende productos y quiere cobrar en pesos y enviar a todo el país.', brand: 'Lumbre Joyería' },
  { slug: 'salud', nombre: 'Salud y bienestar', resumen: 'Para consultorios, clínicas y terapeutas que viven de las citas.', brand: 'Dental Alba' },
  { slug: 'restaurante', nombre: 'Restaurante y café', resumen: 'Para cocinas y cafeterías que quieren llenar mesas y pedidos para llevar.', brand: 'Casa Brasa' },
  { slug: 'servicios', nombre: 'Servicios profesionales', resumen: 'Para despachos, consultores y freelancers que venden confianza.', brand: 'Nodo Contable' },
];

const c = (vert: string, estilo: string, sNombre: string, desc: string, tags: string[], colors: Concepto['colors']): Omit<Concepto, 'vNombre' | 'brand'> => ({
  vert, estilo, sNombre, desc, tags, colors,
});

const base: Omit<Concepto, 'vNombre' | 'brand'>[] = [
  c('tienda', 'museo', 'Museo', 'Collage asimétrico con etiquetas de exhibición. La joya como obra.', ['Serif', 'Editorial'], ['#F2EBDD', '#C9A24B', '#1B1712']),
  c('tienda', 'lookbook', 'Lookbook', 'Foto a sangre y wordmark gigante, con tipografía de revista de moda.', ['Oscuro', 'Moda'], ['#0F0D0B', '#C9A24B', '#F3ECDD']),
  c('tienda', 'pop', 'Pop', 'Bento de colores sólidos, stickers y botones de precio. Para público joven.', ['Color', 'Bento'], ['#EFE6FF', '#5B21D6', '#D6F55E']),
  c('salud', 'reserva', 'Reserva primero', 'El hero es el widget de cita: tratamiento, día y hora en un minuto.', ['Conversión', 'Limpio'], ['#FFFFFF', '#0F8F83', '#0B2B29']),
  c('salud', 'humano', 'Humano', 'Formas orgánicas, calidez y una sección para quien le tiene miedo al dentista.', ['Cálido', 'Orgánico'], ['#FBEFE3', '#C2562B', '#3B2316']),
  c('salud', 'precision', 'Precisión', 'Oscuro y técnico: catálogo de tratamientos en tabla y diagrama dental.', ['Oscuro', 'Técnico'], ['#0A1B33', '#2DD4A8', '#EAF1FB']),
  c('restaurante', 'cartel', 'Cartel de fuego', 'Foto a sangre, titulares condensados y menú tipo pizarra.', ['Oscuro', 'Cartel'], ['#14100D', '#F26A1B', '#F5EBDD']),
  c('restaurante', 'mercado', 'Mesa de mercado', 'Fotos tipo polaroid, tipografía manuscrita y menú del día.', ['Cálido', 'Artesanal'], ['#F4EDD8', '#2F6B3C', '#F2C14E']),
  c('restaurante', 'carta', 'Carta de autor', 'Puramente tipográfica, con mucho aire y una carta en dos columnas.', ['Minimal', 'Tipográfico'], ['#FFFFFF', '#D8431E', '#111111']),
  c('servicios', 'datos', 'Panel con datos', 'Una vista de ejemplo de "tu mes en orden" y planes de precio fijo.', ['Corporativo', 'Producto'], ['#FFFFFF', '#1D4ED8', '#0E2038']),
  c('servicios', 'brutalista', 'Brutalista', 'Amarillo, bordes gruesos y sombras duras. Para despachos que se atreven.', ['Atrevido', 'Editorial'], ['#FFE94A', '#0A0A0A', '#FF4D2E']),
  c('servicios', 'conversacional', 'Conversacional', 'Un chat de ejemplo con tu contador y una línea de tiempo del método.', ['Sereno', 'Conversación'], ['#F5F3EC', '#4F7A63', '#E4EBE0']),
];

/** Las 12 demos en orden de recorrido (vertiente por vertiente). */
export const CATALOGO: Concepto[] = base.map((b) => {
  const v = VERTIENTES.find((x) => x.slug === b.vert)!;
  return { ...b, vNombre: v.nombre, brand: v.brand };
});

export const hrefDe = (x: Pick<Concepto, 'vert' | 'estilo'>) => `/showroom/${x.vert}/${x.estilo}`;
export const miniaturaDe = (x: Pick<Concepto, 'vert' | 'estilo'>) => `/showroom/thumbs/${x.vert}-${x.estilo}.jpg`;
export const getConcepto = (vert: string, estilo: string) => CATALOGO.find((x) => x.vert === vert && x.estilo === estilo);

/** Anterior y siguiente en el recorrido circular. */
export function vecinos(vert: string, estilo: string) {
  const i = Math.max(0, CATALOGO.findIndex((x) => x.vert === vert && x.estilo === estilo));
  const n = CATALOGO.length;
  return { i, n, prev: CATALOGO[(i - 1 + n) % n], next: CATALOGO[(i + 1) % n] };
}
