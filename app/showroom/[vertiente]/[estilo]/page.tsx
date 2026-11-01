import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Landing from '@/components/showroom/Landing';
import { ESTILOS, getEstilo } from '@/lib/showroom/estilos';
import { VERTICALES, getVertical } from '@/lib/showroom/verticales';

type Params = { vertiente: string; estilo: string };

export function generateStaticParams(): Params[] {
  return VERTICALES.flatMap((v) => (ESTILOS[v.slug] ?? []).map((s) => ({ vertiente: v.slug, estilo: s.slug })));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const v = getVertical(params.vertiente);
  const s = getEstilo(params.vertiente, params.estilo);
  if (!v || !s) return {};
  return {
    title: `${v.brand} · ${s.nombre} | Showroom Velant`,
    description: `Demo de landing para ${v.nombre.toLowerCase()} en estilo ${s.nombre.toLowerCase()}.`,
    robots: { index: false },
  };
}

export default function Page({ params }: { params: Params }) {
  const v = getVertical(params.vertiente);
  const s = getEstilo(params.vertiente, params.estilo);
  if (!v || !s) notFound();
  return <Landing v={v} s={s} />;
}
