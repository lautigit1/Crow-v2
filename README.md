# 🚛 CrowRepuestos - E-Commerce Profesional

> **Sistema de comercio electrónico de última generación para repuestos de camiones, construido con las mejores prácticas de React 2025**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/TanStack_Query-5.90-red?style=for-the-badge&logo=react-query)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Características Principales

### 🎯 **Experiencia de Usuario**
- **Catálogo inteligente** con búsqueda avanzada y filtros dinámicos
- **Carrito de compras** persistente con cálculo automático de envío
- **Lista de favoritos** para productos deseados
- **Sistema de autenticación** completo con perfiles de usuario
- **Proceso de checkout** optimizado y seguro
- **Confirmación de pedidos** con tracking detallado

### 🏗️ **Arquitectura Moderna**
- **Next.js 15** con App Router y Server Components
- **TypeScript estricto** para máxima confiabilidad
- **Zustand** para manejo de estado global eficiente
- **TanStack React Query** para gestión de datos del servidor
- **React Hook Form** para formularios robustos con validación
- **Tailwind CSS** para diseño responsive y moderno

### 🚀 **Performance & Developer Experience**
- **SSG/ISR** para páginas ultra-rápidas
- **Skeleton loading** y estados de carga optimizados
- **Lazy loading** de componentes e imágenes
- **Código modular** y fácil de mantener
- **Componentes reutilizables** con props tipadas
- **API abstraída** con simulación de delays reales

## 🛠️ Tecnologías Utilizadas

### **Frontend Core**
```json
{
  "framework": "Next.js 15.5.4",
  "language": "TypeScript 5.0+",
  "styling": "Tailwind CSS 3.4",
  "animations": "Framer Motion"
}
```

### **Estado y Datos**
```json
{
  "global_state": "Zustand 4.5+ con persistencia",
  "server_state": "TanStack React Query 5.90",
  "forms": "React Hook Form 7.51 con validaciones",
  "api_layer": "Fetch API con simulación async"
}
```

### **Herramientas de Desarrollo**
```json
{
  "linter": "ESLint con configuración Next.js",
  "formatter": "Prettier",
  "type_checking": "TypeScript strict mode",
  "bundler": "Webpack 5 (incluido en Next.js)"
}
```

## 🚀 Inicio Rápido

### **Prerrequisitos**
- Node.js 18.17+ 
- npm 9+ o yarn 1.22+

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/lautigit1/crow-repuestos.git
cd crow-repuestos

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (http://localhost:3000)

# Producción  
npm run build        # Build optimizado para producción
npm run start        # Servidor de producción

# Calidad de Código
npm run lint         # Análisis de código con ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 📁 Estructura del Proyecto

```
crow-repuestos/
├── app/                          # App Router de Next.js
│   ├── components/              # Componentes reutilizables
│   │   ├── ui/                 # Componentes base (Input, Button)
│   │   ├── cart/               # Componentes del carrito
│   │   ├── layout/             # Layout y navegación
│   │   └── providers/          # Providers de contexto
│   ├── stores/                 # Stores de Zustand
│   │   ├── useCartStore.ts     # Estado del carrito
│   │   ├── useAuthStore.ts     # Estado de autenticación
│   │   └── useWishlistStore.ts # Estado de favoritos
│   ├── lib/                    # Utilidades y APIs
│   │   ├── auth-api.ts         # API de autenticación
│   │   ├── products-api.ts     # API de productos
│   │   └── formatPrice.ts      # Helpers de formato
│   ├── types/                  # Definiciones TypeScript
│   │   ├── product.d.ts        # Tipos de productos
│   │   └── auth.d.ts          # Tipos de autenticación
│   ├── data/                   # Datos estáticos y constantes
│   └── (pages)/                # Rutas de la aplicación
├── public/                      # Assets estáticos
├── tailwind.config.ts          # Configuración Tailwind
├── next.config.ts              # Configuración Next.js
└── tsconfig.json               # Configuración TypeScript
```

## 🎨 Funcionalidades Destacadas

### **🛒 Carrito Inteligente**
- Persistencia automática en localStorage
- Cálculo dinámico de envío (gratis >$200.000)
- Validación de stock en tiempo real
- Animaciones suaves con Framer Motion

### **🔍 Búsqueda Avanzada**
- Búsqueda por texto, marca, modelo y categoría
- Filtros dinámicos que se actualizan según resultados
- Normalización de texto (sin tildes) para mejor UX
- Resultados instantáneos sin recargas

### **👤 Gestión de Usuarios**
- Autenticación simulada con JWT
- Perfil completo con direcciones y historial
- Recuperación de sesión automática
- Rutas protegidas con redirects inteligentes

### **📱 Diseño Responsive**
- Mobile-first con Tailwind CSS
- Grid adaptativo para catálogo de productos
- Sidebar colapsable en dispositivos móviles
- Optimizado para touch en tablets

## 🏆 Mejores Prácticas Implementadas

### **Arquitectura**
- ✅ **Separación de responsabilidades** - UI, lógica de negocio y datos
- ✅ **Componentes puros** - Props tipadas y sin efectos secundarios
- ✅ **Custom hooks** - Lógica reutilizable y testeable
- ✅ **Error boundaries** - Manejo graceful de errores

### **Performance**
- ✅ **Code splitting** automático por rutas
- ✅ **Image optimization** con componente Next.js Image
- ✅ **Bundle analysis** - Chunks optimizados
- ✅ **Memoización** estratégica de componentes costosos

### **Desarrollo**
- ✅ **TypeScript estricto** - Zero `any` types
- ✅ **Conventional commits** - Historial limpio
- ✅ **Component composition** sobre herencia
- ✅ **Atomic design** - Componentes escalables

## 🔧 Configuración Avanzada

### **Variables de Entorno**
Crear `.env.local` para configuración personalizada:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.crowrepuestos.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CHECKOUT=true
```

### **Personalización de Tema**
Editar `tailwind.config.ts` para ajustar colores y espaciados:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        'azul-electrico': '#00D4FF',
        'rojo-potente': '#FF3B30',
        primary: 'var(--color-primary)',
      }
    }
  }
}
```

## 🚀 Deployment

### **Vercel (Recomendado)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Lautaro** - [@lautigit1](https://github.com/lautigit1)

---

<div align="center">

**⭐ Si este proyecto te fue útil, no olvides darle una estrella ⭐**

*Construido con 💙 y las mejores prácticas de React 2025*

</div>

---

### Nota sobre metadataBase

Para evitar la advertencia `metadataBase property in metadata export is not set` configura la variable de entorno `NEXT_PUBLIC_SITE_URL` con la URL pública de tu sitio (por ejemplo `https://misitio.com`). En desarrollo, `http://localhost:3000` se usa como fallback.
