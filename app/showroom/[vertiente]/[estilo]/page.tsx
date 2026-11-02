import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DemoBar from '@/components/showroom/DemoBar';
import DemoFooter from '@/components/showroom/DemoFooter';
import { CATALOGO, getConcepto } from '@/lib/showroom/catalogo';
import { getLanding } from '@/lib/showroom/landings';

type Params = { vertiente: string; estilo: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return CATALOGO.map((c) => ({ vertiente: c.vert, estilo: c.estilo }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const c = getConcepto(params.vertiente, params.estilo);
  if (!c) return {};
  return {
    title: `${c.brand} · ${c.sNombre} | Showroom Velant`,
    description: `Demo de landing para ${c.vNombre.toLowerCase()}: ${c.desc}`,
    robots: { index: false },
  };
}

export default function Page({ params }: { params: Params }) {
  const landing = getLanding(params.vertiente, params.estilo);
  if (!landing) notFound();
  return (
    <div className="landing-demo pt-12">
      <DemoBar vert={params.vertiente} estilo={params.estilo} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href={landing.fonts} />
      {/* HTML propio de la demo (contenido estático escrito por nosotros). */}
      <div dangerouslySetInnerHTML={{ __html: landing.html }} />
      <DemoFooter vert={params.vertiente} estilo={params.estilo} />
    </div>
  );
}
