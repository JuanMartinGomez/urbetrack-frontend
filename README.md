# Urbetrack Frontend

SPA de gestión de higiene urbana desarrollada como parte del desafío técnico para la posición de Frontend Developer en Urbetrack.

## Stack tecnológico

| React + TypeScript | Framework principal |
| Vite | Bundler y dev server |
| React Query | Fetching, caché y sincronización de datos del servidor |
| Zustand | Estado global del cliente (estado local de incidentes) |
| Zod | Validación de schemas y tipado de formularios |
| Tailwind CSS | Estilos |
| React Router | Navegación client-side |
| Leaflet + React Leaflet | Mapas interactivos |
| Recharts | Gráficos y visualizaciones |
| Vitest + React Testing Library | Tests unitarios |

## Requisitos previos

- Node.js 18+
- pnpm

## Instalación

```bash
pnpm install
```

## Correr el proyecto

El proyecto requiere que el backend esté corriendo localmente.

```bash
# Terminal 1 — backend
cd backend
pnpm dev

# Terminal 2 — frontend
pnpm dev
```

El frontend corre en `http://localhost:5173` y consume la API en `http://localhost:3000`.

## Correr los tests

```bash
pnpm vitest run
```

## Estructura del proyecto

```
src/
├── api/          # Funciones fetch por entidad
├── components/   # Componentes reutilizables (Table, Filters, Modal, Toast)
├── features/     # Secciones de la app organizadas por dominio
│   ├── home/
│   ├── assets/
│   ├── incidents/
│   ├── vehicles/
│   └── zones/
├── hooks/        # Custom hooks de React Query
├── layouts/      # AppLayout, Sidebar, Header
├── schemas/      # Schemas Zod por entidad
├── store/        # Stores de Zustand
├── types/        # Tipos TypeScript globales
└── router.tsx    # Definición de rutas
```

## Funcionalidades implementadas

### Home

- Dashboard con 4 cards de resumen (Assets, Incidentes, Vehículos, Zonas)
- Fetching paralelo con `useQueries` para cargar todas las métricas simultáneamente
- Navegación directa a cada sección desde las cards

### Assets

- Listado con paginación, ordenamiento por columnas y filtros por tipo y estado
- Formulario de creación con validación y feedback visual (Toast)

### Incidentes

- Listado con paginación, ordenamiento y filtros por tipo, estado y zona
- Flujo de estados: `REPORTED → IN_PROGRESS → RESOLVED`
- Formulario de creación con validación y feedback visual (Toast)

### Vehículos

- Listado con paginación, ordenamiento y filtros por tipo, estado y zona
- Formulario de creación con validación y feedback visual (Toast)

### Zonas

- Listado de zonas con navegación al detalle
- **Detalle de zona** con:
  - KPIs (assets OK/dañados/llenos, incidentes abiertos/resueltos)
  - Mapa interactivo con clustering de markers (assets e incidentes diferenciados por color)
  - Gráficos de distribución por estado (Recharts)
  - Tabla de assets con filtros locales por dirección, tipo y estado
  - Tabla de incidentes con flujo de estados

## Decisiones técnicas

### React Query + Zustand

React Query maneja todo el estado del servidor (fetching, caché, refetch). Zustand se usa únicamente para el estado local de los incidentes, ya que el backend no expone un endpoint PATCH/PUT para actualizar estados. En un sistema productivo, el cambio de estado se persistiría en el servidor y React Query invalidaría el caché automáticamente.

### Componentes genéricos

`Table` y `Filters` son componentes genéricos configurables mediante props. Las columnas y filtros de cada entidad se definen en archivos separados (`AssetColumns.tsx`, `AssetFilters.ts`, etc.), siguiendo el principio Open/Closed: los componentes base no se modifican para agregar nuevas entidades.

### Paginación client-side

El backend no implementa paginación server-side, devolviendo hasta 1500 registros en un solo request. La paginación se implementa client-side en el componente `Table`. En producción se recomendaría paginación server-side con parámetros `page` y `limit`.

### Validación con Zod

Los schemas de Zod se usan para validar formularios antes de enviar al backend. Los tipos `FormData` se infieren directamente del schema con `z.infer<typeof schema>`, evitando duplicación entre tipos y validaciones.

### Mapa con clustering

El detalle de zona puede contener 300+ assets. Se implementó clustering de markers con `react-leaflet-markercluster` y `fitBounds` automático para mejorar la performance y la experiencia con grandes volúmenes de datos.
