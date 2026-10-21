import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-secondary">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-8 py-7 text-[13px]">
        <span className="font-exo2 font-bold tracking-[0.08em]">VELANT AGENCIA DIGITAL</span>
        <div className="flex flex-wrap gap-6">
          <Link href="/servicios" className="hover:text-white">Servicios</Link>
          <Link href="/portafolio" className="hover:text-white">Portafolio</Link>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <Link href="/contacto" className="hover:text-white">Contacto</Link>
        </div>
        <span>© {currentYear} Velant. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
