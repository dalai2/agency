import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre Nosotros */}
          <div>
            <div className="mb-4 [&_path]:fill-white [&_span]:text-white">
              <Logo size="sm" showText={true} />
            </div>
            <p className="text-gray-300 mb-4">
              Tu presencia digital en días, no meses. Innovación constante, adaptabilidad y confianza para llevar tu negocio al siguiente nivel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-secondary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/portafolio" className="text-gray-300 hover:text-secondary transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-secondary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-300">Veracruz, México</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-secondary mt-1 flex-shrink-0" />
                <a href="mailto:contacto@velant.mx" className="text-gray-300 hover:text-secondary transition-colors">
                  contacto@velant.mx
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-400 mt-4">
                  Respondemos en menos de 2 horas
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} VELANT Agencia Digital. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-secondary transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-gray-400 hover:text-secondary transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






