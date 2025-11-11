-- ===========================================
-- SCHEMA PARA SUPABASE - AGENCIA DIGITAL
-- ===========================================
-- Ejecuta este script en el SQL Editor de Supabase

-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- TABLA: leads (Contactos/Solicitudes)
-- ===========================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  servicio_interes VARCHAR(100),
  mensaje TEXT,
  status VARCHAR(50) DEFAULT 'nuevo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- ===========================================
-- TABLA: servicios (Catálogo de Servicios)
-- ===========================================
CREATE TABLE IF NOT EXISTS servicios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio_normal DECIMAL(10,2),
  precio_oferta DECIMAL(10,2),
  tiempo_entrega VARCHAR(50),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice
CREATE INDEX IF NOT EXISTS idx_servicios_activo ON servicios(activo);

-- ===========================================
-- TABLA: proyectos (Portfolio)
-- ===========================================
CREATE TABLE IF NOT EXISTS proyectos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url VARCHAR(500),
  categoria VARCHAR(100),
  tecnologias TEXT[],
  url_proyecto VARCHAR(500),
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_proyectos_categoria ON proyectos(categoria);
CREATE INDEX IF NOT EXISTS idx_proyectos_destacado ON proyectos(destacado);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Habilitar RLS en todas las tablas
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- POLÍTICAS RLS - LEADS
-- ===========================================

-- Permitir INSERT público (para el formulario de contacto)
CREATE POLICY "Permitir insert público en leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Solo usuarios autenticados pueden leer leads
CREATE POLICY "Solo autenticados pueden leer leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Solo usuarios autenticados pueden actualizar leads
CREATE POLICY "Solo autenticados pueden actualizar leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Solo usuarios autenticados pueden eliminar leads
CREATE POLICY "Solo autenticados pueden eliminar leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- ===========================================
-- POLÍTICAS RLS - SERVICIOS
-- ===========================================

-- Permitir lectura pública de servicios activos
CREATE POLICY "Lectura pública de servicios activos"
  ON servicios
  FOR SELECT
  TO anon
  USING (activo = true);

-- Solo usuarios autenticados pueden gestionar servicios
CREATE POLICY "Solo autenticados pueden gestionar servicios"
  ON servicios
  FOR ALL
  TO authenticated
  USING (true);

-- ===========================================
-- POLÍTICAS RLS - PROYECTOS
-- ===========================================

-- Permitir lectura pública de proyectos
CREATE POLICY "Lectura pública de proyectos"
  ON proyectos
  FOR SELECT
  TO anon
  USING (true);

-- Solo usuarios autenticados pueden gestionar proyectos
CREATE POLICY "Solo autenticados pueden gestionar proyectos"
  ON proyectos
  FOR ALL
  TO authenticated
  USING (true);

-- ===========================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ===========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para leads
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ===========================================

-- Insertar servicios de ejemplo
INSERT INTO servicios (nombre, descripcion, precio_normal, precio_oferta, tiempo_entrega, activo) VALUES
('Landing Page Profesional', 'Página de aterrizaje optimizada para convertir visitantes en clientes', 5000.00, 2500.00, '3-5 días', true),
('E-commerce Básico', 'Tienda online completa con pasarela de pagos y panel de administración', 12000.00, 8000.00, '7-10 días', true),
('Paquete Presencia Digital', 'Landing page + Logo básico + Integración RRSS', 5000.00, 3500.00, '5-7 días', true),
('Paquete Negocio Completo', 'E-commerce + Logo + Banner + Capacitación', 13000.00, 10000.00, '10-14 días', true)
ON CONFLICT DO NOTHING;

-- ===========================================
-- VERIFICACIÓN
-- ===========================================

-- Verifica que las tablas se crearon correctamente
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('leads', 'servicios', 'proyectos');

-- Verifica las políticas RLS
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('leads', 'servicios', 'proyectos');

-- ===========================================
-- NOTAS IMPORTANTES
-- ===========================================

/*
1. Ejecuta este script completo en el SQL Editor de Supabase
2. Asegúrate de que RLS esté habilitado en cada tabla
3. Las políticas permiten:
   - Inserción pública en 'leads' (formulario de contacto)
   - Lectura pública de 'servicios' y 'proyectos'
   - Gestión completa solo para usuarios autenticados
4. Para crear un usuario admin, usa la sección de Authentication en Supabase
*/








