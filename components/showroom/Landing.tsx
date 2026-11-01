import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, Award, Briefcase, Calculator, Calendar, Clock, Coffee, CreditCard,
  FileText, Flame, Gem, Heart, Leaf, MapPin, Package, Scale, ShieldCheck, Smile, Sparkles,
  Star, Stethoscope, Truck, UtensilsCrossed, Users, Wine, Quote,
  type LucideIcon,
} from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';
import type { IconKey, Style, Vertical } from '@/lib/showroom/types';

const ICONS: Record<IconKey, LucideIcon> = {
  gem: Gem, truck: Truck, shield: ShieldCheck, sparkles: Sparkles, heart: Heart, smile: Smile,
  calendar: Calendar, clock: Clock, stethoscope: Stethoscope, flame: Flame, utensils: UtensilsCrossed,
  pin: MapPin, coffee: Coffee, briefcase: Briefcase, scale: Scale, calculator: Calculator, file: FileText,
  star: Star, package: Package, card: CreditCard, leaf: Leaf, users: Users, award: Award, wine: Wine,
};

const mix = (pct: number, base = 'var(--surface)') => `color-mix(in srgb, var(--accent) ${pct}%, ${base})`;

/** Ilustración abstracta de relleno: se cambia por foto real cuando hay cliente. */
function Art({ kind, icon, i = 0, style, noIcon, src, priority, sizes = '(min-width: 1024px) 380px, 50vw' }: { kind: Style['art']; icon: IconKey; i?: number; style?: CSSProperties; noIcon?: boolean; src?: string; priority?: boolean; sizes?: string }) {
  const Icon = ICONS[icon];
  if (src) {
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: mix(14), ...style }}>
        <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const a = [88, 70, 55][i % 3];
  const b = [30, 45, 22][i % 3];
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: mix(14), ...style }}>
      {kind === 'arch' && (
        <>
          <div className="absolute bottom-0 left-1/2 h-[78%] w-[62%] -translate-x-1/2" style={{ background: mix(a), borderRadius: '999px 999px 0 0' }} />
          <div className="absolute right-[10%] top-[10%] h-[22%] w-[22%] rounded-full" style={{ background: mix(b) }} />
        </>
      )}
      {kind === 'circle' && (
        <>
          <div className="absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: mix(b) }} />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: mix(a) }} />
        </>
      )}
      {kind === 'blocks' && (
        <>
          <div className="absolute left-0 top-0 h-[58%] w-[54%]" style={{ background: mix(a) }} />
          <div className="absolute bottom-0 right-0 h-[46%] w-[58%]" style={{ background: mix(b) }} />
          <div className="absolute bottom-[12%] left-[10%] h-[24%] w-[24%] rounded-full" style={{ background: mix(Math.min(a + 8, 100)) }} />
        </>
      )}
      {!noIcon && <Icon
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '24%', height: '24%', color: 'var(--accentInk)', minWidth: 22, minHeight: 22 }}
        strokeWidth={1.4}
      />}
    </div>
  );
}

export default function Landing({ v, s }: { v: Vertical; s: Style }) {
  const t = s.t;
  const wa = whatsappUrl(`Hola, vi la demo "${v.brand}" (${v.nombre} · estilo ${s.nombre}) en el showroom de Velant y quiero una página así.`);
  const hardShadow = t.hard ? `5px 5px 0 ${t.ink}` : undefined;
  const cardBorder = `${t.bw === '0px' ? '1px' : t.bw} solid ${t.line}`;
  const Brand = ICONS[v.icon];
  const img = (k: string | number) => `/showroom/${v.slug}/${k}.jpg`;

  const root = {
    '--bg': t.bg, '--surface': t.surface, '--ink': t.ink, '--muted': t.muted,
    '--accent': t.accent, '--accentInk': t.accentInk, '--line': t.line,
    background: t.bg, color: t.ink, fontFamily: t.body,
  } as CSSProperties;

  const h: CSSProperties = {
    fontFamily: t.heading, fontWeight: t.headingWeight, letterSpacing: t.tracking,
    textTransform: t.headingCase, lineHeight: 1.04,
  };
  const big = t.headingCase === 'uppercase' ? 'clamp(3rem, 8vw, 6rem)' : 'clamp(2.4rem, 5.6vw, 4.6rem)';
  const h2Size = t.headingCase === 'uppercase' ? 'clamp(2.2rem, 5vw, 3.6rem)' : 'clamp(1.9rem, 3.8vw, 2.9rem)';

  const btnBase: CSSProperties = {
    borderRadius: t.btn === 'pill' ? 999 : t.radius,
    border: `${t.bw} solid`,
    boxShadow: hardShadow,
    fontWeight: 600,
  };
  const Btn = ({ href, primary = true, invert = false, children }: { href: string; primary?: boolean; invert?: boolean; children: ReactNode }) => {
    const bg = invert ? t.accentInk : primary ? t.accent : 'transparent';
    const fg = invert ? t.accent : primary ? t.accentInk : t.ink;
    const bd = invert ? t.accentInk : primary ? t.accent : t.ink;
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3.5 text-[15px] transition-transform hover:-translate-y-0.5"
        style={{ ...btnBase, background: bg, color: fg, borderColor: bd }}
      >
        {children}
      </a>
    );
  };

  const heroDark = !!t.heroBg;
  const heroStyle: CSSProperties = heroDark ? { background: t.heroBg, color: t.heroInk } : {};
  const heroMuted = heroDark ? { color: t.heroInk, opacity: 0.78 } : { color: t.muted };

  const heroText = (center: boolean) => (
    <div className={center ? 'mx-auto max-w-3xl text-center' : ''}>
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: heroDark ? t.accent : t.accent === t.ink ? t.muted : t.accent }}>
        {v.hero.eyebrow}
      </p>
      <h1 style={{ ...h, fontSize: big }}>{v.hero.title}</h1>
      <p className={`mt-6 text-lg leading-relaxed ${center ? 'mx-auto max-w-xl' : 'max-w-md'}`} style={heroMuted}>
        {v.hero.sub}
      </p>
      <div className={`mt-9 flex flex-wrap gap-3 ${center ? 'justify-center' : ''}`}>
        <Btn href={wa}>{v.hero.cta} <ArrowRight size={16} /></Btn>
        <Btn href="#catalogo" primary={false}>{v.hero.cta2}</Btn>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-10" style={root}>
      {/* Barra de demo (no forma parte de la landing) */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-between gap-3 bg-[#111] px-4 text-xs text-white">
        <Link href="/showroom" className="flex items-center gap-1.5 opacity-90 hover:opacity-100">
          <ArrowLeft size={14} /> Showroom
        </Link>
        <span className="hidden truncate opacity-70 sm:block">
          Demo · {v.nombre} · estilo {s.nombre} · contenido ficticio
        </span>
        <a href={wa} target="_blank" rel="noreferrer" className="rounded bg-white px-3 py-1 font-semibold text-black hover:bg-[#F0F7F7]">
          Quiero una así
        </a>
      </div>

      {/* Navegación */}
      <header style={heroStyle} className="relative z-10">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-5 md:px-8">
          <div className="flex items-center gap-2.5" style={{ ...h, fontSize: '1.25rem' }}>
            <Brand size={22} style={{ color: t.accent }} strokeWidth={1.8} />
            {v.brand}
          </div>
          <nav className="hidden items-center gap-8 text-sm md:flex" style={heroMuted}>
            {v.nav.map((n) => <a key={n} href="#catalogo" className="hover:opacity-100">{n}</a>)}
          </nav>
          <Btn href={wa}>{v.hero.cta}</Btn>
        </div>
      </header>

      {/* Hero */}
      <section style={heroStyle} className="relative overflow-hidden">
        {s.hero === 'split' && (
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-2 md:px-8 md:pb-28 md:pt-16">
            {heroText(false)}
            <div className="aspect-[4/5] w-full overflow-hidden" style={{ borderRadius: s.art === 'arch' ? '999px 999px 0 0' : t.radius, border: cardBorder, boxShadow: hardShadow }}>
              <Art kind={s.art} icon={v.icon} src={img('hero')} priority sizes="(min-width: 768px) 560px, 100vw" />
            </div>
          </div>
        )}
        {s.hero === 'center' && (
          <div className="mx-auto max-w-[1180px] px-6 pb-16 pt-14 md:px-8 md:pt-24">
            {heroText(true)}
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-3 md:gap-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`overflow-hidden ${i === 1 ? 'aspect-[3/4] md:-mt-8' : 'aspect-[3/4] md:mt-6'}`} style={{ borderRadius: t.radius, border: cardBorder, boxShadow: hardShadow }}>
                  <Art kind={s.art} icon={v.offers[i].icon} i={i} src={img(i)} sizes="(min-width: 768px) 280px, 33vw" />
                </div>
              ))}
            </div>
          </div>
        )}
        {s.hero === 'bleed' && (
          <>
            <div className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl" style={{ background: t.accent }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] md:block" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, #000 45%)', maskImage: 'linear-gradient(to right, transparent, #000 45%)' }}>
              <Art kind={s.art} icon={v.icon} src={img('hero')} priority sizes="600px" />
            </div>
            <div className="relative mx-auto max-w-[1180px] px-6 pb-24 pt-14 md:px-8 md:pb-36 md:pt-24">
              <div className="max-w-2xl">{heroText(false)}</div>
            </div>
          </>
        )}
      </section>

      {/* Cifras */}
      <section style={{ borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, background: t.surface }}>
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 gap-4 px-6 py-8 md:px-8">
          {v.stats.map((x) => (
            <div key={x.l} className="text-center md:text-left">
              <div style={{ ...h, fontSize: 'clamp(1.5rem, 3.4vw, 2.4rem)' }}>{x.n}</div>
              <div className="mt-1 text-xs md:text-sm" style={{ color: t.muted }}>{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Oferta */}
      <section id="catalogo" className="mx-auto max-w-[1180px] px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12 max-w-xl">
          <h2 style={{ ...h, fontSize: h2Size }}>{v.offersTitle}</h2>
          <p className="mt-3 text-lg" style={{ color: t.muted }}>{v.offersSub}</p>
        </div>

        {s.grid === 'cards' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {v.offers.map((o, i) => (
              <article key={o.name} className="overflow-hidden" style={{ background: t.surface, border: cardBorder, borderRadius: t.radius, boxShadow: hardShadow }}>
                <div className="relative aspect-[4/3]">
                  <Art kind={s.art} icon={o.icon} i={i} src={img(i)} />
                  {o.tag && <span className="absolute left-3 top-3 px-2.5 py-1 text-[11px] font-semibold" style={{ background: t.accent, color: t.accentInk, borderRadius: t.btn === 'pill' ? 999 : t.radius }}>{o.tag}</span>}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{o.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: t.muted }}>{o.desc}</p>
                  {o.price && <p className="mt-4 font-semibold">{o.price}</p>}
                </div>
              </article>
            ))}
          </div>
        )}

        {s.grid === 'tiles' && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
            {v.offers.map((o, i) => (
              <article key={o.name} className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: t.radius, border: cardBorder, boxShadow: hardShadow }}>
                <Art kind={s.art} icon={o.icon} i={i} src={img(i)} />
                {o.tag && <span className="absolute left-3 top-3 px-2.5 py-1 text-[11px] font-semibold" style={{ background: t.accent, color: t.accentInk, borderRadius: t.btn === 'pill' ? 999 : t.radius }}>{o.tag}</span>}
                <div className="absolute inset-x-2.5 bottom-2.5 p-3.5 md:inset-x-3 md:bottom-3 md:p-4" style={{ background: t.surface, borderRadius: `calc(${t.radius} * 0.6)`, border: t.hard ? cardBorder : undefined }}>
                  <h3 className="text-sm font-semibold leading-tight md:text-base">{o.name}</h3>
                  <p className="mt-0.5 hidden text-xs sm:block" style={{ color: t.muted }}>{o.desc}</p>
                  {o.price && <p className="mt-1.5 text-sm font-semibold" style={{ color: t.accent === t.ink ? t.ink : t.accent }}>{o.price}</p>}
                </div>
              </article>
            ))}
          </div>
        )}

        {s.grid === 'list' && (
          <div style={{ borderTop: `1px solid ${t.line}` }}>
            {v.offers.map((o, i) => (
              <article key={o.name} className="flex items-center gap-5 py-6 md:gap-8" style={{ borderBottom: `1px solid ${t.line}` }}>
                <span className="hidden w-8 text-sm tabular-nums md:block" style={{ color: t.muted }}>{String(i + 1).padStart(2, '0')}</span>
                <div className="h-16 w-16 shrink-0 overflow-hidden md:h-20 md:w-20" style={{ borderRadius: t.radius }}>
                  <Art kind={s.art} icon={o.icon} i={i} src={img(i)} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 style={{ ...h, fontSize: '1.35rem' }}>{o.name}{o.tag && <span className="ml-3 align-middle text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.accent === t.ink ? t.muted : t.accent }}>{o.tag}</span>}</h3>
                  <p className="mt-1 text-sm" style={{ color: t.muted }}>{o.desc}</p>
                </div>
                {o.price && <p className="shrink-0 text-right font-semibold">{o.price}</p>}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Beneficios */}
      <section style={{ background: t.surface, borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-8 md:py-24">
          <h2 style={{ ...h, fontSize: h2Size }} className="mb-12 max-w-lg">{v.featuresTitle}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {v.features.map((f) => {
              const I = ICONS[f.icon];
              return (
                <div key={f.title}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center" style={{ background: t.accent, color: t.accentInk, borderRadius: t.btn === 'pill' ? 999 : t.radius, border: t.hard ? `${t.bw} solid ${t.ink}` : undefined, boxShadow: hardShadow }}>
                    <I size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 leading-relaxed" style={{ color: t.muted }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonio */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Quote className="mx-auto mb-6" size={32} style={{ color: t.accent === t.ink ? t.muted : t.accent }} strokeWidth={1.5} />
        <blockquote style={{ ...h, fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', textTransform: 'none', lineHeight: 1.25 }}>
          “{v.quote.text}”
        </blockquote>
        <p className="mt-6 text-sm" style={{ color: t.muted }}>
          <strong style={{ color: t.ink }}>{v.quote.who}</strong> · {v.quote.role}
        </p>
      </section>

      {/* Cierre */}
      <section className="px-6 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1180px] px-6 py-16 text-center md:px-12 md:py-20" style={{ background: t.accent, color: t.accentInk, borderRadius: t.radius, border: t.hard ? `${t.bw} solid ${t.ink}` : undefined, boxShadow: hardShadow }}>
          <h2 style={{ ...h, fontSize: h2Size }}>{v.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-md text-lg" style={{ opacity: 0.85 }}>{v.finalCta.sub}</p>
          <div className="mt-8 flex justify-center">
            <Btn href={wa} invert>{v.finalCta.btn} <ArrowRight size={16} /></Btn>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${t.line}`, color: t.muted }}>
        <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-2 px-6 py-8 text-sm md:flex-row md:px-8">
          <span>{v.footer.line1}</span>
          <span>{v.footer.line2}</span>
        </div>
      </footer>
    </div>
  );
}
