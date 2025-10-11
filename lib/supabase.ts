import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para la base de datos
export type Lead = {
  id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  servicio_interes?: string;
  mensaje?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type Servicio = {
  id?: string;
  nombre: string;
  descripcion?: string;
  precio_normal?: number;
  precio_oferta?: number;
  tiempo_entrega?: string;
  activo?: boolean;
  created_at?: string;
};

export type Proyecto = {
  id?: string;
  titulo: string;
  descripcion?: string;
  imagen_url?: string;
  categoria?: string;
  tecnologias?: string[];
  url_proyecto?: string;
  destacado?: boolean;
  created_at?: string;
};

