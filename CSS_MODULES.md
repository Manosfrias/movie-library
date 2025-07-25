# CSS Modules en este proyecto

Este proyecto utiliza CSS Modules para el styling, que es una forma moderna y eficiente de trabajar con CSS en React/Next.js.

## ¿Qué son los CSS Modules?

Los CSS Modules permiten escribir CSS de forma local y modular, evitando conflictos de nombres de clases y proporcionando mejor encapsulación.

## Cómo usar CSS Modules

### 1. Crear un archivo CSS Module

Crea un archivo con la extensión `.module.css`:

```css
/* components/Button/Button.module.css */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #0056b3;
}

.primary {
  background-color: #007bff;
}

.secondary {
  background-color: #6c757d;
}
```

### 2. Importar y usar en tu componente

```tsx
// components/Button/Button.tsx
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### 3. Usar clases condicionales

```tsx
import styles from './Component.module.css';

export default function Component({ active }: { active: boolean }) {
  return (
    <div
      className={`${styles.base} ${active ? styles.active : styles.inactive}`}
    >
      Content
    </div>
  );
}
```

## Ventajas de CSS Modules

- **Encapsulación**: Las clases son locales al componente
- **Sin conflictos**: No hay colisiones de nombres de clases
- **Autocompletado**: Mejor soporte en IDEs
- **Eliminación de código muerto**: CSS no utilizado se puede detectar más fácilmente
- **TypeScript**: Soporte nativo para tipado de clases CSS

## Convenciones recomendadas

1. Un archivo `.module.css` por componente
2. Usar camelCase para nombres de clases
3. Colocar el archivo CSS junto al componente
4. Usar nombres descriptivos y semánticos

## Ejemplo de estructura de archivos

```
src/
  components/
    Button/
      Button.tsx
      Button.module.css
      index.ts
    Card/
      Card.tsx
      Card.module.css
      index.ts
  app/
    page.tsx
    page.module.css
    layout.tsx
    globals.css
```
