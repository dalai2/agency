import type { Style } from './types';

const F = {
  cormorant: 'var(--f-cormorant), Georgia, serif',
  syne: 'var(--f-syne), system-ui, sans-serif',
  inter: 'var(--f-inter), system-ui, sans-serif',
  dmsans: 'var(--f-dmsans), system-ui, sans-serif',
  fraunces: 'var(--f-fraunces), Georgia, serif',
  space: 'var(--f-space), system-ui, sans-serif',
  bebas: 'var(--f-bebas), Impact, sans-serif',
  dmserif: 'var(--f-dmserif), Georgia, serif',
  manrope: 'var(--f-manrope), system-ui, sans-serif',
};

// Tres estilos por vertiente. Cada uno combina paleta + tipografía + forma
// + una disposición distinta de hero y de rejilla, para que no sean solo recolores.
export const ESTILOS: Record<string, Style[]> = {
  tienda: [
    {
      slug: 'editorial',
      nombre: 'Editorial',
      desc: 'Crema, serif elegante y mucho aire. Se siente revista de lujo.',
      hero: 'split', grid: 'cards', art: 'arch',
      t: { bg: '#F6F0E6', surface: '#FFFBF3', ink: '#1C1917', muted: '#6B6259', accent: '#1C1917', accentInk: '#F6F0E6', line: '#DDD2C0', radius: '0px', heading: F.cormorant, body: F.dmsans, headingCase: 'none', headingWeight: 500, tracking: '-0.01em', btn: 'solid', bw: '1px', hard: false },
    },
    {
      slug: 'vibrante',
      nombre: 'Vibrante',
      desc: 'Lila, formas redondas y tipografía con carácter para público joven.',
      hero: 'center', grid: 'tiles', art: 'circle',
      t: { bg: '#F3EDFF', surface: '#FFFFFF', ink: '#24104F', muted: '#6B5C8F', accent: '#6D28D9', accentInk: '#FFFFFF', line: '#DCCFF7', radius: '28px', heading: F.syne, body: F.dmsans, headingCase: 'none', headingWeight: 800, tracking: '-0.03em', btn: 'pill', bw: '0px', hard: false },
    },
    {
      slug: 'noir',
      nombre: 'Noir',
      desc: 'Negro profundo con dorado. Joyería de alta gama, sin ruido.',
      hero: 'bleed', grid: 'list', art: 'blocks',
      t: { bg: '#0D0D0D', surface: '#171717', ink: '#F2E8D0', muted: '#A39A86', accent: '#C9A24B', accentInk: '#0D0D0D', line: '#2C2820', heroBg: '#141108', heroInk: '#F2E8D0', radius: '2px', heading: F.cormorant, body: F.inter, headingCase: 'none', headingWeight: 500, tracking: '0.02em', btn: 'solid', bw: '1px', hard: false },
    },
  ],
  salud: [
    {
      slug: 'clinico',
      nombre: 'Clínico',
      desc: 'Blanco y verde agua. Limpio, confiable, cero intimidante.',
      hero: 'split', grid: 'cards', art: 'circle',
      t: { bg: '#FFFFFF', surface: '#F1FAF9', ink: '#0F2E2C', muted: '#527270', accent: '#0F9B8E', accentInk: '#FFFFFF', line: '#D5ECE9', radius: '14px', heading: F.dmsans, body: F.inter, headingCase: 'none', headingWeight: 700, tracking: '-0.02em', btn: 'solid', bw: '0px', hard: false },
    },
    {
      slug: 'calido',
      nombre: 'Cálido',
      desc: 'Duraznos y terracota con serif suave. Ideal si el miedo es el reto.',
      hero: 'center', grid: 'tiles', art: 'arch',
      t: { bg: '#FBF1E6', surface: '#FFF9F2', ink: '#3B2316', muted: '#8A6A55', accent: '#C2562B', accentInk: '#FFF9F2', line: '#EBD5BF', radius: '26px', heading: F.fraunces, body: F.dmsans, headingCase: 'none', headingWeight: 600, tracking: '-0.02em', btn: 'pill', bw: '0px', hard: false },
    },
    {
      slug: 'moderno',
      nombre: 'Moderno',
      desc: 'Azul noche con menta. Se ve a clínica de especialidad.',
      hero: 'bleed', grid: 'list', art: 'blocks',
      t: { bg: '#F4F7FB', surface: '#FFFFFF', ink: '#0B1E3A', muted: '#5A6B85', accent: '#2DD4A8', accentInk: '#06251D', line: '#DAE2EE', heroBg: '#0B1E3A', heroInk: '#EAF1FB', radius: '10px', heading: F.space, body: F.inter, headingCase: 'none', headingWeight: 700, tracking: '-0.02em', btn: 'solid', bw: '0px', hard: false },
    },
  ],
  restaurante: [
    {
      slug: 'fuego',
      nombre: 'Fuego',
      desc: 'Carbón y naranja, titulares condensados. Apetito a primera vista.',
      hero: 'bleed', grid: 'tiles', art: 'circle',
      t: { bg: '#141210', surface: '#1F1B18', ink: '#F5EBDD', muted: '#A99886', accent: '#F26A1B', accentInk: '#140C06', line: '#34302B', heroBg: '#1B1009', heroInk: '#F5EBDD', radius: '4px', heading: F.bebas, body: F.manrope, headingCase: 'uppercase', headingWeight: 400, tracking: '0.02em', btn: 'solid', bw: '0px', hard: false },
    },
    {
      slug: 'mercado',
      nombre: 'Mercado',
      desc: 'Crema y verde hoja, serif con personalidad. Fresco y de barrio.',
      hero: 'center', grid: 'cards', art: 'arch',
      t: { bg: '#F7F2E4', surface: '#FFFDF5', ink: '#1F3322', muted: '#5F705F', accent: '#2F6B3C', accentInk: '#F7F2E4', line: '#DDD6BC', radius: '18px', heading: F.dmserif, body: F.dmsans, headingCase: 'none', headingWeight: 400, tracking: '-0.01em', btn: 'pill', bw: '0px', hard: false },
    },
    {
      slug: 'minimal',
      nombre: 'Minimal',
      desc: 'Blanco, negro y una sola línea de color. Menú como carta de autor.',
      hero: 'split', grid: 'list', art: 'blocks',
      t: { bg: '#FFFFFF', surface: '#F7F7F5', ink: '#111111', muted: '#6E6E6A', accent: '#D8431E', accentInk: '#FFFFFF', line: '#E6E6E1', radius: '0px', heading: F.manrope, body: F.manrope, headingCase: 'none', headingWeight: 800, tracking: '-0.04em', btn: 'solid', bw: '1px', hard: false },
    },
  ],
  servicios: [
    {
      slug: 'corporativo',
      nombre: 'Corporativo',
      desc: 'Azul marino y blanco. Serio sin ser aburrido; transmite respaldo.',
      hero: 'split', grid: 'cards', art: 'blocks',
      t: { bg: '#FFFFFF', surface: '#F3F6FA', ink: '#0E2038', muted: '#53647C', accent: '#1D4ED8', accentInk: '#FFFFFF', line: '#D9E1EC', radius: '8px', heading: F.inter, body: F.inter, headingCase: 'none', headingWeight: 700, tracking: '-0.03em', btn: 'solid', bw: '0px', hard: false },
    },
    {
      slug: 'brutalista',
      nombre: 'Brutalista',
      desc: 'Amarillo, bordes negros y sombras duras. Para despachos que se atreven.',
      hero: 'center', grid: 'tiles', art: 'circle',
      t: { bg: '#FFE94A', surface: '#FFFFFF', ink: '#0A0A0A', muted: '#3A3A2E', accent: '#0A0A0A', accentInk: '#FFE94A', line: '#0A0A0A', radius: '0px', heading: F.space, body: F.space, headingCase: 'uppercase', headingWeight: 700, tracking: '-0.03em', btn: 'solid', bw: '2px', hard: true },
    },
    {
      slug: 'sereno',
      nombre: 'Sereno',
      desc: 'Hueso y verde salvia con serif. Asesoría tranquila, de largo plazo.',
      hero: 'bleed', grid: 'list', art: 'arch',
      t: { bg: '#F5F3EC', surface: '#FFFFFF', ink: '#22302A', muted: '#66746B', accent: '#4F7A63', accentInk: '#FFFFFF', line: '#DEDACB', heroBg: '#E4EBE0', heroInk: '#22302A', radius: '12px', heading: F.fraunces, body: F.inter, headingCase: 'none', headingWeight: 500, tracking: '-0.02em', btn: 'pill', bw: '0px', hard: false },
    },
  ],
};

export const getEstilo = (vertical: string, slug: string) =>
  ESTILOS[vertical]?.find((s) => s.slug === slug);
