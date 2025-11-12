import React from 'react';
import Button from '@/components/Button';
import PortfolioContent from './PortfolioContent';

export const metadata = {
  title: 'Portafolio | VELANT Agencia Digital',
  description: 'Conoce nuestros proyectos de desarrollo web. Próximamente casos de éxito de nuestros clientes.',
};

export default function PortafolioPage() {
  // Categorías para filtros futuros
  const categorias = [
    { nombre: 'Todos', slug: 'todos' },
    { nombre: 'Landing Pages', slug: 'landing' },
    { nombre: 'E-commerce', slug: 'ecommerce' },
    { nombre: 'Corporativos', slug: 'corporativo' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-exo2 font-bold mb-6 uppercase">
              Nuestro Portafolio
            </h1>
            <p className="text-xl text-white/90">
              Proyectos que transforman negocios. Pronto mostraremos aquí casos de éxito de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros (preparados para futuro) */}
      <section className="py-8 bg-light sticky top-20 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categorias.map((categoria) => (
              <button
                key={categoria.slug}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  categoria.slug === 'todos'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <PortfolioContent />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Quieres ser parte de nuestro portafolio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Como parte de nuestra oferta de lanzamiento, los primeros clientes 
              obtienen un descuento especial y la oportunidad de ser showcased en nuestro portafolio.
            </p>
            <Button href="/contacto" variant="primary" size="lg">
              Iniciar Mi Proyecto
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}






