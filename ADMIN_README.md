# Panel de Administración - Crow Repuestos

## Descripción General
Panel de administración simulado para gestionar el catálogo de productos de repuestos de camiones. Las modificaciones se manejan en el estado del frontend y se persisten en localStorage, sirviendo como una maqueta funcional completa de la interfaz de un CMS.

## Acceso al Panel

### Credenciales
- **URL:** `/admin/login`
- **Contraseña:** `admin123`

### Acceso Directo (Desarrollo)
En modo desarrollo, aparece un ícono ⚙️ en la barra de navegación principal que lleva al login del panel de administración.

## Funcionalidades Implementadas

### 🔐 Sistema de Autenticación
- Login simulado con contraseña fija
- Protección de rutas administrativas
- Persistencia de sesión en localStorage
- Redirección automática si no está autenticado

### 📊 Dashboard
- Estadísticas en tiempo real del catálogo
- Contador de productos totales
- Alertas de stock bajo y productos sin stock
- Productos con stock crítico (≤15 unidades)
- Botón para restaurar catálogo original

### 📦 Gestión de Productos (CRUD Completo)

#### Listar Productos
- Tabla completa con todos los productos
- Información: imagen, nombre, marca, precio, stock, estado
- Indicadores visuales de stock (En stock, Stock bajo, Sin stock)
- Filtros por etiquetas (Oferta, Más Vendido, Novedad, etc.)

#### Crear Productos
- Formulario completo con todos los campos
- Validación de campos obligatorios
- Generación automática de ID único
- Categorización y especificaciones técnicas
- Preview en tiempo real

#### Editar Productos
- Edición de productos existentes
- Pre-carga de datos actuales
- Formulario idéntico al de creación
- Actualización en tiempo real

#### Eliminar Productos
- Modal de confirmación
- Eliminación instantánea
- Actualización automática de la lista

### 🎯 Características Técnicas

#### Persistencia de Datos
- Uso de localStorage para simular base de datos
- Sincronización automática entre sesiones
- Respaldo del catálogo original
- Restauración con un clic

#### Estado Global
- Context API para gestión de estado
- Hooks personalizados (`useAdmin`)
- Sincronización entre componentes
- Performance optimizada

#### UI/UX
- Diseño responsive (mobile-first)
- Sidebar de navegación fijo
- Breadcrumbs y navegación intuitiva
- Loading states y feedback visual
- Confirmaciones de acciones destructivas

## Estructura de Archivos

```
app/admin/
├── context/
│   └── AdminContext.tsx          # Context global del admin
├── dashboard/
│   └── page.tsx                  # Dashboard principal
├── login/
│   └── page.tsx                  # Página de login
├── orders/
│   └── page.tsx                  # Placeholder para órdenes
├── products/
│   ├── create/
│   │   └── page.tsx             # Crear producto
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx         # Editar producto
│   └── page.tsx                 # Lista de productos
└── layout.tsx                   # Layout del panel admin
```

## Rutas Disponibles

- `/admin/login` - Página de acceso
- `/admin/dashboard` - Panel principal
- `/admin/products` - Lista de productos
- `/admin/products/create` - Crear nuevo producto
- `/admin/products/edit/[id]` - Editar producto específico
- `/admin/orders` - Órdenes (próximamente)

## Funcionalidades Futuras

### 🛒 Gestión de Órdenes
- Ver todas las órdenes de compra
- Filtrar por estado (pendiente, procesado, enviado)
- Actualizar estados de envío
- Información detallada de clientes
- Reportes de ventas

### 📊 Analytics y Reportes
- Productos más vendidos
- Análisis de stock
- Reportes de ingresos
- Métricas de rendimiento

### 👥 Gestión de Usuarios
- Lista de clientes registrados
- Historial de compras por cliente
- Gestión de direcciones de envío

### ⚙️ Configuraciones
- Configuración de la tienda
- Gestión de categorías
- Configuración de envíos y pagos

## Notas Técnicas

### Seguridad
- Solo disponible en desarrollo (el ícono de acceso)
- Autenticación simulada (no para producción)
- Sin validación de backend

### Performance
- Lazy loading de componentes
- Optimización de imágenes con Next.js Image
- Estado memoizado para evitar re-renders

### Compatibilidad
- Compatible con Next.js 15
- Responsive design para todos los dispositivos
- Accesibilidad mejorada con ARIA labels

## Uso en Desarrollo

1. Ejecutar `npm run dev`
2. Navegar a la tienda principal
3. Hacer clic en ⚙️ en la barra de navegación
4. Usar contraseña: `admin123`
5. Explorar todas las funcionalidades del panel

¡El panel está completamente funcional y listo para demostrar un flujo completo de administración de e-commerce!