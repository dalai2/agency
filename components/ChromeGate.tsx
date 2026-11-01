'use client';

import { usePathname } from 'next/navigation';

// Las landings de demo (/showroom/<vertiente>/<estilo>) llevan su propio diseño:
// ocultan el Header/Footer de Velant para verse como lo vería el cliente.
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  if (/^\/showroom\/[^/]+\/[^/]+/.test(pathname)) return null;
  return <>{children}</>;
}
