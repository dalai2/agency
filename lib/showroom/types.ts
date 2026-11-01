export type IconKey =
  | 'gem' | 'truck' | 'shield' | 'sparkles' | 'heart' | 'smile' | 'calendar' | 'clock'
  | 'stethoscope' | 'flame' | 'utensils' | 'pin' | 'coffee' | 'briefcase' | 'scale'
  | 'calculator' | 'file' | 'star' | 'package' | 'card' | 'leaf' | 'users' | 'award' | 'wine';

export type Offer = { name: string; desc: string; price?: string; tag?: string; icon: IconKey };

export type Vertical = {
  slug: string;
  nombre: string; // nombre de la vertiente en el showroom
  resumen: string; // para quién es
  brand: string; // marca ficticia de la demo
  icon: IconKey;
  nav: string[];
  hero: { eyebrow: string; title: string; sub: string; cta: string; cta2: string };
  stats: { n: string; l: string }[];
  offersTitle: string;
  offersSub: string;
  offers: Offer[];
  featuresTitle: string;
  features: { title: string; desc: string; icon: IconKey }[];
  quote: { text: string; who: string; role: string };
  finalCta: { title: string; sub: string; btn: string };
  footer: { line1: string; line2: string };
};

export type Theme = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
  line: string;
  heroBg?: string;
  heroInk?: string;
  radius: string; // px
  heading: string; // css font-family
  body: string;
  headingCase: 'none' | 'uppercase';
  headingWeight: number;
  tracking: string;
  btn: 'solid' | 'pill';
  bw: string; // grosor de borde
  hard: boolean; // sombras duras estilo brutalista
};

export type Style = {
  slug: string;
  nombre: string;
  desc: string;
  hero: 'split' | 'center' | 'bleed';
  grid: 'cards' | 'list' | 'tiles';
  art: 'arch' | 'circle' | 'blocks';
  t: Theme;
};
