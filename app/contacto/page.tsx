'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import Card from '@/components/Card';
import Button from '@/components/Button';

// Schema de validación
const contactSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(10, 'Teléfono debe tener al menos 10 dígitos').optional(),
  servicio_interes: z.string().min(1, 'Selecciona un servicio'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('leads').insert([
        {
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono || null,
          servicio_interes: data.servicio_interes,
          mensaje: data.mensaje,
          status: 'nuevo',
        },
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Hubo un error al enviar el formulario. Por favor, intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicios = [
    'Landing Page Profesional',
    'E-commerce Básico',
    'Paquete Presencia Digital',
    'Paquete Negocio Completo',
    'Sitio Corporativo',
    'Logo + Identidad',
    'Mantenimiento',
    'Otro',
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '52XXXXXXXXXX';
  const whatsappMessage = encodeURIComponent('Hola, me interesa conocer sus servicios');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-exo2 font-bold mb-6 uppercase">
              Hablemos de Tu Proyecto
            </h1>
            <p className="text-xl text-white/90">
              Estamos aquí para ayudarte. Responderemos en menos de 2 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">Ubicación</h3>
              <p className="text-gray-600">Veracruz, México</p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-accent" size={32} />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">Email</h3>
              <a href="mailto:contacto@velant.mx" className="text-primary hover:underline">
                contacto@velant.mx
              </a>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-secondary" size={32} />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">Tiempo de Respuesta</h3>
              <p className="text-gray-600">Menos de 2 horas</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulario y WhatsApp */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulario */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">
                Solicita tu Cotización Gratuita
              </h2>
              <p className="text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-green-800 font-semibold">¡Mensaje enviado con éxito!</p>
                    <p className="text-green-700 text-sm">Nos pondremos en contacto contigo pronto.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-red-800 font-semibold">Error al enviar</p>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-dark mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    {...register('nombre')}
                    type="text"
                    id="nombre"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Juan Pérez"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="juan@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-dark mb-2">
                    Teléfono (opcional)
                  </label>
                  <input
                    {...register('telefono')}
                    type="tel"
                    id="telefono"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="2221234567"
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="servicio_interes" className="block text-sm font-medium text-dark mb-2">
                    Servicio de Interés *
                  </label>
                  <select
                    {...register('servicio_interes')}
                    id="servicio_interes"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecciona un servicio</option>
                    {servicios.map((servicio) => (
                      <option key={servicio} value={servicio}>
                        {servicio}
                      </option>
                    ))}
                  </select>
                  {errors.servicio_interes && (
                    <p className="mt-1 text-sm text-red-600">{errors.servicio_interes.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-dark mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    {...register('mensaje')}
                    id="mensaje"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                  {errors.mensaje && (
                    <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              </form>
            </div>

            {/* Opciones Alternativas */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">
                O Contáctanos Directamente
              </h2>
              <p className="text-gray-600 mb-8">
                Si prefieres una respuesta inmediata, escríbenos por WhatsApp.
              </p>

              {/* WhatsApp Card */}
              <Card className="mb-8 bg-[#25D366]/5 border-2 border-[#25D366]/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark">WhatsApp</h3>
                    <p className="text-gray-600">Respuesta inmediata</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Chatea con nosotros y obtén respuesta en minutos. Estamos disponibles para resolver todas tus dudas.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" size="lg" className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                    Abrir WhatsApp
                  </Button>
                </a>
              </Card>

              {/* Email Card */}
              <Card>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Mail className="text-accent" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark">Email</h3>
                    <p className="text-gray-600">Respuesta en 2 horas</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Escríbenos directamente a nuestro email si prefieres comunicación escrita detallada.
                </p>
                <a
                  href="mailto:contacto@velant.mx"
                  className="text-primary hover:underline font-medium"
                >
                  contacto@velant.mx
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa/Ubicación Ilustración */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center">
              <MapPin className="text-primary mx-auto mb-4" size={64} />
              <h2 className="text-3xl font-bold text-dark mb-4">
                Con Orgullo desde Veracruz
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                Trabajamos con empresas de todo México
              </p>
              <p className="text-gray-600">
                Aunque estamos basados en Veracruz, atendemos clientes en toda la República Mexicana. 
                Todo nuestro proceso es 100% remoto y eficiente.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Prefieres ver los precios primero?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Conoce todos nuestros servicios y precios especiales de lanzamiento
            </p>
            <Button href="/servicios" variant="primary" size="lg">
              Ver Servicios y Precios
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}






