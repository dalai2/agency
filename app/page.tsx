import React from 'react';
import Link from 'next/link';
import { Zap, Briefcase, DollarSign, Wrench, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20 md:py-32 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #2E4354, #000000)', color: 'white', padding: '80px 0'}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-exo2 font-bold mb-6 leading-tight uppercase">
              Tu Presencia Digital en Días, No Meses
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Innovación constante, adaptabilidad y confianza. Velocidad, eficiencia y tecnología de vanguardia para llevar tu negocio al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contacto" variant="accent" size="lg">
                Solicitar Cotización
              </Button>
              <Button href="/servicios" variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                Ver Servicios
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">3-10</div>
                <div className="text-sm md:text-base text-white/80">Días de entrega</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">50%</div>
                <div className="text-sm md:text-base text-white/80">Ahorro vs agencias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">100%</div>
                <div className="text-sm md:text-base text-white/80">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-exo2 font-bold text-dark mb-4 uppercase">
              Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Software, E-commerce, Landing Pages, AI Services y Diseño
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Landing Page */}
            <Card hover gradient>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-exo2 font-bold text-dark mb-2 uppercase">
                  Landing
                </h3>
                <p className="text-gray-600 mb-4">
                  Páginas de aterrizaje optimizadas para convertir visitantes en clientes
                </p>
                <div className="my-6">
                  <div className="text-sm text-gray-500 line-through">$5,000 MXN</div>
                  <div className="text-4xl font-bold text-primary">$2,500</div>
                  <div className="text-sm text-gray-600">MXN</div>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600 mb-6">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Entrega: 3-5 días
                </div>
                <Button href="/servicios" variant="primary" className="w-full">
                  Más Información
                </Button>
              </div>
            </Card>

            {/* E-commerce */}
            <Card hover gradient className="md:scale-105 md:shadow-2xl">
              <div className="absolute top-4 right-4 bg-dark text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-exo2 font-bold text-dark mb-2 uppercase">
                  E-commerce
                </h3>
                <p className="text-gray-600 mb-4">
                  Tienda online completa con pasarela de pagos y panel de administración
                </p>
                <div className="my-6">
                  <div className="text-sm text-gray-500 line-through">$12,000 MXN</div>
                  <div className="text-4xl font-bold text-dark">$8,000</div>
                  <div className="text-sm text-gray-600">MXN</div>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600 mb-6">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Entrega: 7-10 días
                </div>
                <Button href="/servicios" variant="primary" className="w-full">
                  Más Información
                </Button>
              </div>
            </Card>

            {/* AI Services */}
            <Card hover gradient>
              <div className="text-center">
                <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-exo2 font-bold text-dark mb-2 uppercase">
                  AI Services
                </h3>
                <p className="text-gray-600 mb-4">
                  Integración de inteligencia artificial para automatización y análisis inteligente
                </p>
                <div className="my-6">
                  <div className="text-sm text-gray-600">Desde</div>
                  <div className="text-4xl font-bold text-dark">$5,000</div>
                  <div className="text-sm text-gray-600">MXN</div>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600 mb-6">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Tecnología de vanguardia
                </div>
                <Button href="/servicios" variant="primary" className="w-full">
                  Más Información
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Atributos de Marca */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-exo2 font-bold text-dark mb-4 uppercase">
              ¿Por Qué VELANT?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nuestros valores te impulsan al éxito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-exo2 font-bold text-dark mb-2 uppercase">Velocidad</h3>
              <p className="text-gray-600">
                Tu proyecto listo en días, no meses. Entrega rápida sin comprometer la calidad.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-exo2 font-bold text-dark mb-2 uppercase">Eficiencia</h3>
              <p className="text-gray-600">
                Procesos optimizados para máxima productividad y mejores resultados.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-exo2 font-bold text-dark mb-2 uppercase">Liderazgo</h3>
              <p className="text-gray-600">
                A la vanguardia de la tecnología y las mejores prácticas del mercado.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-exo2 font-bold text-dark mb-2 uppercase">Asistencia</h3>
              <p className="text-gray-600">
                Soporte continuo y atención personalizada para tu éxito.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-exo2 font-bold text-dark mb-2 uppercase">Novedad</h3>
              <p className="text-gray-600">
                Innovación constante con las últimas tendencias y tecnologías.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-exo2 font-bold text-dark mb-2 uppercase">Tecnología</h3>
              <p className="text-gray-600">
                Herramientas de vanguardia para soluciones digitales de primer nivel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores VELANT */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-exo2 font-bold mb-4 uppercase">
              Valores
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Los principios que guían cada proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Innovación Constante', icon: Sparkles },
              { title: 'Adaptabilidad', icon: Zap },
              { title: 'Confianza', icon: CheckCircle },
              { title: 'Responsabilidad', icon: Briefcase },
              { title: 'Excelencia', icon: ArrowRight },
              { title: 'Colaboración', icon: Wrench },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <Icon className="text-secondary mb-3" size={32} />
                  <h3 className="text-xl font-exo2 font-bold uppercase">{value.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-exo2 font-bold text-dark mb-4 uppercase">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparente y eficiente
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Consulta Inicial',
                  description: 'Conversamos sobre tu proyecto, necesidades y objetivos. Sin compromiso.',
                  color: 'primary'
                },
                {
                  step: '02',
                  title: 'Propuesta y Cotización',
                  description: 'Recibe una propuesta detallada con tiempos y costos claros.',
                  color: 'secondary'
                },
                {
                  step: '03',
                  title: 'Desarrollo',
                  description: 'Trabajamos en tu proyecto con entregas parciales para tu revisión.',
                  color: 'accent'
                },
                {
                  step: '04',
                  title: 'Lanzamiento',
                  description: 'Publicamos tu sitio y te brindamos soporte continuo.',
                  color: 'primary'
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <Card className="h-full">
                    <div className={`text-6xl font-bold text-${item.color}/20 mb-4`}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </Card>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="text-gray-300" size={32} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Oferta de Lanzamiento */}
      <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <span className="font-exo2 font-bold text-lg uppercase">🔥 OFERTA DE LANZAMIENTO</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-exo2 font-bold mb-6 uppercase">
              ¡Solo 10 lugares disponibles!
            </h2>
            
            <p className="text-xl mb-8 text-white/90">
              Aprovecha los precios especiales de lanzamiento y ahorra hasta un 50% en todos nuestros servicios
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">50%</div>
                <div className="text-sm">de descuento</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">10</div>
                <div className="text-sm">lugares disponibles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">3-10</div>
                <div className="text-sm">días de entrega</div>
              </div>
            </div>

            <Button href="/contacto" variant="primary" size="lg" className="text-lg">
              ¡Aprovecha la Oferta!
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-exo2 font-bold mb-6 uppercase">
              ¿Listo para llevar tu negocio al siguiente nivel?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a establecer tu presencia digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contacto" variant="primary" size="lg" className="bg-white text-dark hover:bg-secondary">
                Agendar Consulta Gratuita
              </Button>
              <Button href="/servicios" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-accent">
                Ver Precios de Lanzamiento
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

