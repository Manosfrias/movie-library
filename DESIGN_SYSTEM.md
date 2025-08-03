# � Sistema de Design Tokens - Movie Library

## 📋 **Descripción**

Sistema de design tokens específicamente diseñado para Movie Library, con una paleta de colores temática y componentes optimizados para la experiencia cinematográfica.

## 📁 **Estructura de Archivos**

```
src/ui/styles/
├── design-tokens.css    # Variables CSS nativas
├── design-tokens.ts     # Tokens para TypeScript
├── utilities.css        # Clases de utilidad
└── index.ts            # Exportaciones
```

## 🎨 **Paleta de Colores**

### **Neutros**

- `--color-bg` (#ffffff) - Fondo principal
- `--color-bg-soft` (#f8f9fb) - Fondo suave
- `--color-surface` (#f0f2f5) - Superficie de componentes
- `--color-border` (#e2e4e8) - Bordes
- `--color-text` (#2e3a59) - Texto principal
- `--color-text-light` (#6b7280) - Texto secundario

### **Marca / Primarios**

- `--color-primary` (#2e3a59) - Azul noche principal
- `--color-primary-hover` (#1f2a44) - Estado hover
- `--color-primary-light` (#d9dde6) - Versión clara

### **Acentos**

- `--color-accent` (#00b3b3) - Azul turquesa
- `--color-accent-light` (#e0f7f7) - Versión clara
- `--color-warning` (#f9d342) - Amarillo advertencia
- `--color-danger` (#e94f37) - Rojo peligro
- `--color-star` (#fbbf24) - Amarillo para ratings

## 🚀 **Uso en CSS**

### **Variables CSS**

```css
.movie-card {
  background-color: var(--color-bg);
  padding: var(--spacing-6);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
}

.movie-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}
```

### **Clases de Utilidad**

```html
<div class="p-6 bg-white rounded-md shadow-soft">
  <h2 class="text-lg font-semibold text-primary">Título</h2>
  <p class="text-base text-light">Descripción</p>
</div>
```

## 📝 **Tipografía**

### **Tamaños**

- `--font-size-xs` (12px) - Metadatos, labels
- `--font-size-sm` (14px) - Texto secundario
- `--font-size-base` (16px) - Texto principal
- `--font-size-md` (18px) - Subtítulos
- `--font-size-lg` (20px) - Títulos de sección
- `--font-size-xl` (24px) - Títulos principales
- `--font-size-2xl` (32px) - Títulos de página
- `--font-size-3xl` (48px) - Títulos hero

### **Pesos**

- `--font-weight-regular` (400) - Texto normal
- `--font-weight-medium` (500) - Énfasis suave
- `--font-weight-semibold` (600) - Subtítulos
- `--font-weight-bold` (700) - Títulos importantes

### **Fuente**

- `--font-family-sans` - Inter, con fallbacks a sistema

## 📏 **Espaciados**

### **Sistema de 4px**

```css
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px */
--spacing-16: 4rem; /* 64px */
```

### **Gaps Semánticos**

```css
--gap-xs: 4px /* Elementos muy cercanos */ --gap-sm: 8px
  /* Elementos relacionados */ --gap-md: 16px /* Separación estándar */
  --gap-lg: 24px /* Secciones */ --gap-xl: 40px /* Separación amplia */;
```

## 🎭 **Efectos Visuales**

### **Sombras**

- `--shadow-soft` - Sombra suave para elevación sutil
- `--shadow-medium` - Sombra para hover y elementos activos

### **Bordes**

- `--radius-sm` (6px) - Botones, inputs
- `--radius-md` (12px) - Tarjetas, contenedores
- `--radius-full` (9999px) - Elementos circulares

### **Transición**

- `--transition` - Transición estándar (0.2s ease-in-out)

## 💻 **Uso en TypeScript**

```tsx
import { designTokens } from '@/ui/styles';

const MovieCard = () => (
  <div
    style={{
      backgroundColor: designTokens.colors.bg,
      padding: designTokens.spacing[6],
      borderRadius: designTokens.borders.radius.md,
      boxShadow: designTokens.shadows.soft,
    }}
  >
    <h3
      style={{
        fontSize: designTokens.typography.fontSize.lg,
        fontWeight: designTokens.typography.fontWeight.semibold,
        color: designTokens.colors.primary,
      }}
    >
      Título de Película
    </h3>
  </div>
);
```

## 🎬 **Componentes Actualizados**

### ✅ **Componentes con nuevos tokens:**

- `HomePage` - Layout principal con grid y espaciados
- `SearchMovies` - Componente de búsqueda
- `OrderMovies` - Componente de ordenación
- `MovieOfTheDay` - Destacado del día
- `Button` - Botones con variantes primary, secondary, accent
- `MovieCard` - Tarjetas de película con hover effects
- `RootLayout` - Layout principal de la aplicación

### 🎨 **Características aplicadas:**

- **Colores temáticos** coherentes en toda la app
- **Espaciados consistentes** usando sistema de 4px
- **Tipografía escalable** con Inter como fuente principal
- **Efectos hover** suaves y profesionales
- **Sombras sutiles** para profundidad visual
- **Transiciones fluidas** en todas las interacciones

## 📱 **Responsive Design**

```css
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-4);
    gap: var(--gap-md);
  }

  .title {
    font-size: var(--font-size-xl);
  }
}
```

## 🔧 **Extending the System**

### **Agregar nuevos colores:**

```css
:root {
  --color-success: #10b981;
  --color-info: #3b82f6;
}
```

### **Nuevos componentes:**

```css
.notification {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
}
```

## ✅ **Beneficios Implementados**

1. **🎯 Consistencia Visual** - Todos los componentes siguen la misma guía
2. **🎬 Temática Cinematográfica** - Colores y efectos apropiados para película
3. **⚡ Performance** - CSS variables nativas, sin JavaScript overhead
4. **🔧 Mantenibilidad** - Cambios centralizados en un solo lugar
5. **📱 Responsive** - Sistema que se adapta a todos los dispositivos
6. **♿ Accesibilidad** - Contrastes y tamaños apropiados
7. **🎨 Profesional** - Diseño moderno y pulido

---

**🎬 El sistema está completamente implementado y todos los componentes han sido actualizados para usar los nuevos design tokens temáticos de Movie Library.**
