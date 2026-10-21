'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contacto', label: 'Contacto' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#dbe6e8] bg-white/90 backdrop-blur-lg">
      <nav className="mx-auto max-w-[1180px] px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <Logo size="sm" showText={true} />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-primary transition-colors hover:text-black">
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contacto"
            className="hidden rounded-md bg-primary px-[22px] py-[11px] text-sm font-semibold text-white transition-colors hover:bg-black md:inline-block"
          >
            Cotizar mi tienda
          </Link>

          <button
            className="p-2 text-primary md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="space-y-1 pb-2 pt-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 font-medium text-primary hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="mt-3 block rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Cotizar mi tienda
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
