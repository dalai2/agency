'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

const fieldClass =
  'w-full rounded-md border border-[#b9ccd1] bg-white px-3.5 py-3 text-[15px] font-normal text-primary focus:outline-none focus:ring-2 focus:ring-primary';

const HomeContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nombre = String(form.get('nombre') || '').trim();
    const contacto = String(form.get('contacto') || '').trim();
    const mensaje = String(form.get('mensaje') || '').trim();
    const esCorreo = contacto.includes('@');

    setStatus('sending');
    try {
      // La columna `email` es NOT NULL, así que guarda aquí el correo o el WhatsApp.
      const { error } = await supabase.from('leads').insert([
        {
          nombre,
          email: contacto,
          telefono: esCorreo ? null : contacto.slice(0, 20),
          servicio_interes: 'E-commerce',
          mensaje,
          status: 'nuevo',
        },
      ]);
      if (error) throw error;
      setStatus('sent');
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="px-2 py-12 text-center">
        <div className="mb-2.5 font-exo2 text-[26px] font-extrabold">GRACIAS</div>
        <p className="m-0 text-[15px] leading-relaxed">
          Recibimos tu mensaje. Te escribimos en menos de 2 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
        Nombre
        <input name="nombre" required type="text" placeholder="Tu nombre" className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
        Correo o WhatsApp
        <input name="contacto" required type="text" placeholder="tu@correo.com" className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
        ¿Qué vendes?
        <textarea
          name="mensaje"
          rows={4}
          placeholder="Productos, volumen aproximado, si ya tienes tienda…"
          className={`${fieldClass} resize-y`}
        />
      </label>
      {status === 'error' && (
        <p className="m-0 text-sm text-red-700">
          No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos a contacto@velant.mx.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-md bg-primary p-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
      </button>
    </form>
  );
};

export default HomeContactForm;
