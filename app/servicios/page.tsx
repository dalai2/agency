import React from 'react';
import { Check, X, Zap, ShoppingCart, Package, Globe, Palette, Settings } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

export const metadata = {
  title: 'Servicios | VELANT Agencia Digital',
  description: 'Software, E-commerce, Landing Pages, AI Services y Diseño. Tu presencia digital en días, no meses. Precios especiales de lanzamiento.',
};

export default function ServiciosPage() {
  const servicios = [
    {
      icon: <Zap size={40} />,
      nombre: 'Landing Page Profesional',
      precioNormal: 5000,
      precioOferta: 2500,
      entrega: '3-5 días',
      descripcion: 'Página de aterrizaje optimizada para convertir visitantes en clientes',
      incluye: [
        'Diseño moderno y responsive',
        'Formulario de contacto funcional',
        'SEO básico optimizado',
        'Integración con redes sociales',
        'Google Analytics',
        'Hosting primer mes gratis',
        '2 rondas de revisiones',
      ],
      color: 'primary',
    },
    {
      icon: <ShoppingCart size={40} />,
      nombre: 'E-commerce Básico',
      precioNormal: 12000,
      precioOferta: 8000,
      entrega: '7-10 días',
      descripcion: 'Tienda online completa lista para vender',
      incluye: [
        'Hasta 50 productos',
        'Pasarela de pagos (Stripe/PayPal)',
        'Panel de administración',
        'Gestión de inventario',
        'Carrito de compras',
        'Sistema de envíos',
        'Diseño responsive',
        'SEO optimizado',
        'Capacitación incluida',
      ],
      color: 'accent',
      destacado: true,
    },
  ];

  const paquetes = [
    {
      nombre: 'Paquete Presencia Digital',
      precio: 3500,
      ahorro: 1500,
      descripcion: 'Todo lo que necesitas para empezar',
      incluye: [
        'Landing page profesional',
        'Logo básico',
        'Integración redes sociales',
        'Formulario de contacto',
        'SEO básico',
      ],
      color: 'secondary',
    },
    {
      nombre: 'Paquete Negocio Completo',
      precio: 10000,
      ahorro: 3000,
      descripcion: 'La solución integral para tu negocio',
      incluye: [
        'E-commerce completo',
        'Logo + identidad visual',
        'Banner publicitarios (5 diseños)',
        'Capacitación completa',
        '3 meses de soporte',
      ],
      color: 'primary',
      destacado: true,
    },
  ];

  const serviciosAdicionales = [
    {
      nombre: 'Sitio Corporativo',
      descripcion: '5-7 páginas internas',
      precio: 8000,
      incluye: ['Diseño personalizado', 'Blog integrado', 'Formularios múltiples'],
    },
    {
      nombre: 'Logo + Identidad',
      descripcion: 'Branding básico',
      precio: 2000,
      incluye: ['3 propuestas de logo', 'Paleta de colores', 'Tipografías'],
    },
    {
      nombre: 'Mantenimiento Mensual',
      descripcion: 'Soporte continuo',
      precio: 500,
      incluye: ['Actualizaciones', 'Backups', 'Soporte técnico'],
      mensual: true,
    },
    {
      nombre: 'Actualizaciones',
      descripcion: 'Cambios y mejoras',
      precio: 800,
      incluye: ['Cobro por hora', 'Estimación previa', 'Sin sorpresas'],
      porHora: true,
    },
  ];

  const faqs = [
    {
      pregunta: '¿Incluyen hosting y dominio?',
      respuesta: 'El primer mes de hosting está incluido. El dominio no está incluido pero te ayudamos a configurarlo sin costo adicional.',
    },
    {
      pregunta: '¿Puedo hacer cambios después de la entrega?',
      respuesta: 'Sí, incluimos 2 rondas de revisiones. Cambios adicionales se cobran según nuestras tarifas de actualización.',
    },
    {
      pregunta: '¿Qué pasa si no me gusta el diseño?',
      respuesta: 'Trabajamos contigo hasta que estés satisfecho. Las revisiones están incluidas en el servicio.',
    },
    {
      pregunta: '¿Puedo agregar funcionalidades después?',
      respuesta: 'Por supuesto. Podemos expandir tu sitio en cualquier momento con funcionalidades adicionales.',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-exo2 font-bold mb-6 uppercase">
              Servicios
            </h1>
            <p className="text-xl text-white/90">
              Software, E-commerce, Landing Pages, AI Services y Diseño. Velocidad, eficiencia y tecnología de vanguardia.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios Principales */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-exo2 font-bold text-center text-dark mb-12 uppercase">
            Servicios Principales
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {servicios.map((servicio, index) => (
              <Card key={index} hover className={servicio.destacado ? 'ring-2 ring-accent' : ''}>
                {servicio.destacado && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </div>
                )}
                <div className={`w-16 h-16 bg-${servicio.color}/10 rounded-full flex items-center justify-center mb-4`}>
                  <div className={`text-${servicio.color}`}>{servicio.icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-dark mb-2">
                  {servicio.nombre}
                </h3>
                <p className="text-gray-600 mb-4">{servicio.descripcion}</p>

                <div className="flex items-baseline gap-3 mb-4">
                  <div className="text-sm text-gray-500 line-through">
                    ${servicio.precioNormal.toLocaleString()} MXN
                  </div>
                  <div className={`text-4xl font-bold text-${servicio.color}`}>
                    ${servicio.precioOferta.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">MXN</div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-6 pb-6 border-b">
                  <Zap size={16} className="text-green-500 mr-2" />
                  Entrega: {servicio.entrega}
                </div>

                <div className="space-y-3 mb-6">
                  <p className="font-semibold text-dark">Incluye:</p>
                  {servicio.incluye.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>

                <Button href="/contacto" variant={servicio.color as any} className="w-full">
                  Solicitar Cotización
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-4">
            Paquetes Especiales
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Ahorra más con nuestros paquetes combinados
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {paquetes.map((paquete, index) => (
              <Card key={index} hover className={paquete.destacado ? 'ring-2 ring-primary md:scale-105' : ''}>
                {paquete.destacado && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    MEJOR VALOR
                  </div>
                )}
                
                <div className={`w-12 h-12 bg-${paquete.color}/10 rounded-full flex items-center justify-center mb-4`}>
                  <Package className={`text-${paquete.color}`} size={24} />
                </div>

                <h3 className="text-2xl font-bold text-dark mb-2">
                  {paquete.nombre}
                </h3>
                <p className="text-gray-600 mb-4">{paquete.descripcion}</p>

                <div className="flex items-baseline gap-3 mb-2">
                  <div className={`text-4xl font-bold text-${paquete.color}`}>
                    ${paquete.precio.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">MXN</div>
                </div>
                <div className="text-sm text-green-600 font-semibold mb-6">
                  Ahorro de ${paquete.ahorro.toLocaleString()} MXN
                </div>

                <div className="space-y-3 mb-6">
                  {paquete.incluye.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>

                <Button href="/contacto" variant={paquete.color as any} className="w-full">
                  Contratar Paquete
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-12">
            Servicios Adicionales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {serviciosAdicionales.map((servicio, index) => (
              <Card key={index} hover>
                <h3 className="text-xl font-bold text-dark mb-2">
                  {servicio.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{servicio.descripcion}</p>
                
                <div className="text-3xl font-bold text-primary mb-4">
                  ${servicio.precio.toLocaleString()}
                  {servicio.mensual && <span className="text-sm text-gray-600">/mes</span>}
                  {servicio.porHora && <span className="text-sm text-gray-600">/hora</span>}
                </div>

                <div className="space-y-2">
                  {servicio.incluye.map((item, i) => (
                    <div key={i} className="flex items-start text-sm">
                      <Check size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparación */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-12">
            ¿Por Qué Nuestros Precios?
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4">Característica</th>
                      <th className="text-center py-4 px-4 text-primary">Nosotros</th>
                      <th className="text-center py-4 px-4 text-gray-400">Agencias Tradicionales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Tiempo de entrega', us: '3-10 días', them: '1-3 meses' },
                      { feature: 'Precio landing page', us: '$2,500', them: '$8,000-15,000' },
                      { feature: 'Precio e-commerce', us: '$8,000', them: '$25,000-50,000' },
                      { feature: 'Revisiones incluidas', us: '2 rondas', them: '1-2 rondas' },
                      { feature: 'Soporte post-lanzamiento', us: 'Incluido', them: 'Cargo extra' },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4 font-medium">{row.feature}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center justify-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {row.us}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-500">
                          {row.them}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-12">
            Preguntas Frecuentes
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <h3 className="text-xl font-bold text-dark mb-2">
                  {faq.pregunta}
                </h3>
                <p className="text-gray-600">
                  {faq.respuesta}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para empezar tu proyecto?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Agenda una consulta gratuita y recibe una cotización personalizada
            </p>
            <Button href="/contacto" variant="accent" size="lg">
              Solicitar Cotización Gratuita
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}






