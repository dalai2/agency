# Agencia Digital - Sitio Web

Sitio completo para agencia digital con Next.js 14, Tailwind CSS y Supabase.

## Instalación Rápida

```bash
npm install
```

## Configurar Supabase

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta el contenido de `supabase-schema.sql`
4. Ve a **Settings > API** y copia tus credenciales

## Variables de Entorno

Crea un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_WHATSAPP_NUMBER=5212221234567
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy a Vercel

1. Sube el código a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Agrega las mismas variables de entorno
4. Deploy automático

## Estructura

```
app/
  ├── page.tsx              # Homepage
  ├── servicios/            # Página de servicios
  ├── portafolio/           # Portfolio
  ├── contacto/             # Formulario de contacto
  └── blog/                 # Blog
components/                 # Componentes reutilizables
lib/supabase.ts            # Cliente de Supabase
```

## Personalizar

- **Precios**: Edita `app/servicios/page.tsx`
- **Textos**: Edita `app/page.tsx` y otras páginas
- **Colores**: Edita `tailwind.config.ts`
- **Contacto**: Actualiza email y ubicación en `components/Footer.tsx`
- **WhatsApp**: Configura el número en `.env.local`

## Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
```

## Stack

- Next.js 14 + TypeScript
- Tailwind CSS
- Supabase
- React Hook Form + Zod
- Lucide Icons
