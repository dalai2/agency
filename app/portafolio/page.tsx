import React from 'react';
import { Globe, Rocket, Package } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';

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

  // Placeholder de proyectos para la estructura futura
  const proyectosPlaceholder = [
    {
      icon: <Globe size={40} />,
      titulo: 'Proyecto Landing Page',
      categoria: 'Landing Pages',
      color: 'primary',
    },
    {
      icon: <Package size={40} />,
      titulo: 'Proyecto E-commerce',
      categoria: 'E-commerce',
      color: 'accent',
    },
    {
      icon: <Rocket size={40} />,
      titulo: 'Proyecto Corporativo',
      categoria: 'Corporativos',
      color: 'secondary',
    },
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
          {/* Estado: Próximamente */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <Rocket className="text-white" size={64} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Próximamente Nuestros Primeros Proyectos
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Estamos trabajando en proyectos increíbles para nuestros primeros clientes. 
              Pronto podrás ver aquí casos de éxito, testimonios y ejemplos de nuestro trabajo.
            </p>
            <Button href="/contacto" variant="primary" size="lg">
              Sé Uno de Nuestros Primeros Clientes
            </Button>
          </div>

          {/* Preview de estructura futura */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-dark text-center mb-8">
              Así lucirán nuestros proyectos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proyectosPlaceholder.map((proyecto, index) => (
                <Card key={index} hover className="opacity-60">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <div className={`text-${proyecto.color} opacity-50`}>
                      {proyecto.icon}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className={`inline-block px-3 py-1 bg-${proyecto.color}/10 text-${proyecto.color} text-xs font-semibold rounded-full`}>
                      {proyecto.categoria}
                    </div>
                    <h3 className="text-xl font-bold text-dark">
                      {proyecto.titulo}
                    </h3>
                    <p className="text-gray-600">
                      Descripción del proyecto y tecnologías utilizadas.
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lo que incluiremos en cada caso */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-12">
              Cada Proyecto Mostrará
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <h3 className="text-xl font-bold text-dark mb-2">
                  📸 Screenshots del Proyecto
                </h3>
                <p className="text-gray-600">
                  Imágenes de alta calidad mostrando el diseño y funcionalidades
                </p>
              </Card>
              <Card>
                <h3 className="text-xl font-bold text-dark mb-2">
                  🎯 Objetivos y Resultados
                </h3>
                <p className="text-gray-600">
                  Qué buscaba el cliente y qué logramos juntos
                </p>
              </Card>
              <Card>
                <h3 className="text-xl font-bold text-dark mb-2">
                  💻 Tecnologías Utilizadas
                </h3>
                <p className="text-gray-600">
                  Stack tecnológico y herramientas implementadas
                </p>
              </Card>
              <Card>
                <h3 className="text-xl font-bold text-dark mb-2">
                  ⭐ Testimonio del Cliente
                </h3>
                <p className="text-gray-600">
                  Palabras directas de clientes satisfechos
                </p>
              </Card>
            </div>
          </div>
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






