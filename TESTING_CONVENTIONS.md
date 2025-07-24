# Convenciones de Testing

Este proyecto utiliza una estructura de tests co-localizados junto a cada componente usando el prefijo `_` en el naming.

## 📁 Estructura de Archivos

### Patrón de naming:

- **Componente**: `ComponentName.tsx`
- **Test**: `_ComponentName.test.tsx`
- **Estilos**: `ComponentName.module.css`

### Ejemplo de estructura:

```
src/
  components/
    Button/
      Button.tsx           # Componente
      Button.module.css    # Estilos CSS Module
      _Button.test.tsx     # Tests del componente
      index.ts             # Exportación (opcional)

  app/
    page.tsx              # Página
    page.module.css       # Estilos
    _page.test.tsx        # Tests de la página
```

## 🧪 Creando nuevos tests

### 1. Ubicación

Los tests deben estar en el mismo directorio que el componente que prueban.

### 2. Naming

Usar el prefijo `_` seguido del nombre del archivo del componente:

- `Button.tsx` → `_Button.test.tsx`
- `MovieCard.tsx` → `_MovieCard.test.tsx`
- `page.tsx` → `_page.test.tsx`

### 3. Template básico

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    // Agregar assertions aquí
  });
});
```

## ⚙️ Configuración de Vitest

La configuración principal está en `vite.config.ts`:

```typescript
test: {
  setupFiles: ['./__vitest__/setup.ts'], // Configuración global
  include: ['**/_*.test.{ts,tsx}', '__vitest__/**/*.test.{ts,tsx}'],

  coverage: {
    exclude: [
      '__vitest__/**', // Configuración de testing excluida del coverage
      '__cypress__/**', // Configuración de E2E excluida del coverage
      '**/_*.test.{ts,tsx}', // Tests excluidos del coverage
      // ... otras exclusiones
    ]
  }
}
```

La configuración global de testing está en `__vitest__/setup.ts`.

## 🎯 Ventajas de esta estructura

### ✅ **Co-localización**

- Tests junto al código que prueban
- Fácil encontrar tests relacionados
- Mejor organización del proyecto

### ✅ **Naming claro**

- El prefijo `_` hace obvio que es un archivo de test
- Se ordena alfabéticamente junto al componente
- No conflictos con otros archivos

### ✅ **Mantenibilidad**

- Al mover/renombrar un componente, es fácil mover su test
- Menos navegación entre directorios
- Estructura más intuitiva

## 📝 Ejemplos prácticos

### Componente simple:

```
src/components/
  Header.tsx
  _Header.test.tsx
```

### Componente con estilos:

```
src/components/
  Card.tsx
  Card.module.css
  _Card.test.tsx
```

### Componente complejo:

```
src/components/
  MovieList/
    MovieList.tsx
    MovieList.module.css
    _MovieList.test.tsx
    components/           # Sub-componentes si es necesario
      MovieItem.tsx
      _MovieItem.test.tsx
```

## 🚀 Comandos útiles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests de un archivo específico
npx vitest _Button.test.tsx
```

## 💡 Mejores prácticas

1. **Un archivo de test por componente**
2. **Tests descriptivos y agrupados con `describe`**
3. **Usar `it` para casos de test específicos**
4. **Mockear dependencias externas cuando sea necesario**
5. **Probar comportamiento, no implementación**
