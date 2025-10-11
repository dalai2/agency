import React from 'react';
import { BookOpen, TrendingUp, Code, Lightbulb } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';

export const metadata = {
  title: 'Blog | Agencia Digital México',
  description: 'Próximamente: tips, guías y contenido educativo sobre desarrollo web y marketing digital.',
};

export default function BlogPage() {
  // Categorías para filtros futuros
  const categorias = [
    { nombre: 'Desarrollo Web', icon: <Code size={20} />, color: 'primary' },
    { nombre: 'Marketing Digital', icon: <TrendingUp size={20} />, color: 'accent' },
    { nombre: 'Consejos de Negocio', icon: <Lightbulb size={20} />, color: 'secondary' },
  ];

  // Temas que cubriremos
  const temasProximos = [
    {
      titulo: '¿Cómo elegir el mejor tipo de sitio web para tu negocio?',
      categoria: 'Consejos de Negocio',
      tiempo: '5 min de lectura',
      icon: <Lightbulb size={32} />,
      color: 'secondary',
    },
    {
      titulo: 'SEO básico: 10 tips para aparecer en Google',
      categoria: 'Marketing Digital',
      tiempo: '7 min de lectura',
      icon: <TrendingUp size={32} />,
      color: 'accent',
    },
    {
      titulo: 'Landing Page vs Sitio Web: ¿Cuál necesitas?',
      categoria: 'Desarrollo Web',
      tiempo: '4 min de lectura',
      icon: <Code size={32} />,
      color: 'primary',
    },
    {
      titulo: 'Cómo preparar contenido para tu sitio web',
      categoria: 'Consejos de Negocio',
      tiempo: '6 min de lectura',
      icon: <Lightbulb size={32} />,
      color: 'secondary',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="mx-auto mb-6" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestro Blog
            </h1>
            <p className="text-xl text-white/90">
              Tips, guías y contenido educativo para ayudarte a crecer tu negocio digital
            </p>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div className={`text-${categoria.color}`}>{categoria.icon}</div>
                <span className="font-medium text-dark">{categoria.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Estado: Próximamente */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="w-32 h-32 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="text-white" size={64} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Próximamente Contenido Educativo
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Estamos preparando artículos, guías y recursos valiosos para ayudarte 
              a tomar mejores decisiones sobre tu presencia digital.
            </p>
          </div>

          {/* Preview de artículos futuros */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-dark text-center mb-8">
              Temas que Cubriremos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {temasProximos.map((tema, index) => (
                <Card key={index} hover className="opacity-80">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-${tema.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <div className={`text-${tema.color}`}>{tema.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className={`inline-block px-3 py-1 bg-${tema.color}/10 text-${tema.color} text-xs font-semibold rounded-full mb-2`}>
                        {tema.categoria}
                      </div>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        {tema.titulo}
                      </h3>
                      <p className="text-sm text-gray-500">{tema.tiempo}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Suscripción Newsletter (preparado para futuro) */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sé el Primero en Leer Nuestros Artículos
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Suscríbete para recibir notificaciones cuando publiquemos nuevo contenido
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-6 py-3 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                disabled
              />
              <Button variant="accent" size="md" disabled>
                Próximamente
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Función de suscripción disponible pronto
            </p>
          </div>
        </div>
      </section>

      {/* Por ahora, redirigir a servicios */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-dark mb-6">
              Mientras Tanto, Conoce Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              ¿Listo para llevar tu negocio al siguiente nivel?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/servicios" variant="primary" size="lg">
                Ver Servicios
              </Button>
              <Button href="/contacto" variant="outline" size="lg">
                Contactar Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


