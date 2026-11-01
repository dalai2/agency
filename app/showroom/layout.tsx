import {
  Bebas_Neue, Cormorant_Garamond, DM_Sans, DM_Serif_Display, Fraunces, Inter, Manrope, Space_Grotesk, Syne,
} from 'next/font/google';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-cormorant', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--f-syne', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--f-inter', display: 'swap' });
const dmsans = DM_Sans({ subsets: ['latin'], variable: '--f-dmsans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--f-fraunces', display: 'swap' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--f-space', display: 'swap' });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--f-bebas', display: 'swap' });
const dmserif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--f-dmserif', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--f-manrope', display: 'swap' });

const vars = [cormorant, syne, inter, dmsans, fraunces, space, bebas, dmserif, manrope].map((f) => f.variable).join(' ');

export default function ShowroomLayout({ children }: { children: React.ReactNode }) {
  return <div className={vars}>{children}</div>;
}
