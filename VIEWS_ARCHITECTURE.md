# Estructura de Vistas en UI

## 📁 Arquitectura Implementada

La aplicación ahora utiliza una arquitectura limpia donde las páginas están organizadas como **vistas** dentro de la carpeta `ui`, mientras que `app` mantiene solo el routing de Next.js.

### Estructura Final:

```
src/
├── app/                    # Next.js App Router (solo routing)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Re-export de HomePage
│   ├── globals.css        # Estilos globales
│   └── [id]/
│       └── page.tsx       # Re-export de MovieDetailPage
├── ui/                    # Interfaz de usuario
│   ├── views/             # 🎯 Componentes de página
│   │   ├── index.ts
│   │   ├── home/
│   │   │   ├── HomePage.tsx
│   │   │   └── HomePage.module.css
│   │   └── movie-detail/
│   │       ├── MovieDetailPage.tsx
│   │       └── MovieDetailPage.module.css
│   ├── components/        # Componentes reutilizables
│   ├── hooks/            # Hooks personalizados
│   ├── locales/          # Textos y traducciones
│   └── index.ts          # Exportaciones centralizadas
└── core/                 # Lógica de negocio
```

## 🔄 Cómo Funciona

### 1. **Re-exports en App Router**

```tsx
// app/page.tsx
export { default } from '../ui/views/home/HomePage';

// app/[id]/page.tsx
export { default } from '../../ui/views/movie-detail/MovieDetailPage';
```

### 2. **Vistas en UI**

```tsx
// ui/views/home/HomePage.tsx
import { useTexts } from '../../hooks/useTexts';
import styles from './HomePage.module.css';

export default function HomePage() {
  // Lógica del componente
}
```

### 3. **Exportaciones Centralizadas**

```tsx
// ui/views/index.ts
export { default as HomePage } from './home/HomePage';
export { default as MovieDetailPage } from './movie-detail/MovieDetailPage';
```

## ✅ Ventajas de esta Arquitectura

### 🎯 **Separación Clara de Responsabilidades**

- `app/` → Solo routing y configuración de Next.js
- `ui/views/` → Componentes de página con lógica de presentación
- `core/` → Lógica de negocio

### 🔧 **Mantenibilidad**

- Vistas organizadas por funcionalidad
- CSS modules co-localizados
- Importaciones limpias y tipadas

### 🚀 **Escalabilidad**

- Fácil agregar nuevas vistas
- Reutilización de componentes
- Testing más sencillo

### 📦 **Reutilización**

- Las vistas pueden importarse desde cualquier parte
- Componentes desacoplados del routing
- Estructura preparada para Storybook

## 🧪 **Testing**

Las vistas ahora se pueden testear independientemente:

```tsx
// __tests__/HomePage.test.tsx
import { HomePage } from '../src/ui/views';

test('renders homepage', () => {
  render(<HomePage />);
  // Assertions...
});
```

## 🎨 **Storybook Ready**

```tsx
// stories/HomePage.stories.tsx
import { HomePage } from '../src/ui/views';

export default {
  component: HomePage,
};
```

## ⚡ **Performance**

- Next.js mantiene todas las optimizaciones
- Code splitting por rutas funciona normalmente
- Re-exports no añaden overhead

## 🔄 **Migración Futura**

Si en el futuro necesitas otra estructura de routing (como React Router), solo necesitas cambiar los re-exports en `app/` sin tocar las vistas en `ui/`.

---

**✨ Resultado**: Una arquitectura limpia, escalable y mantenible que separa las preocupaciones mientras mantiene toda la funcionalidad de Next.js.
