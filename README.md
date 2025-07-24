# Movie Library 🎬

Una aplicación de biblioteca de películas moderna construida con Next.js, TypeScript y React.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Framework**: Next.js 14 (App Router)
- **Build Tool**: Vite
- **Testing**: Vitest + Cypress
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky
- **Styling**: CSS Modules

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone <tu-repo-url>
cd movie-library
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura los hooks de Git:

```bash
npm run prepare
```

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
```

### Testing

```bash
npm run test         # Ejecuta las pruebas unitarias una vez
npm run test:watch   # Ejecuta las pruebas en modo watch (re-ejecuta al cambiar archivos)
npm run test:ui      # Ejecuta Vitest con interfaz web
npm run test:coverage # Genera reporte de cobertura
npm run test:coverage-check # Verifica que el coverage cumpla el mínimo del 80%
npm run cypress:open # Abre Cypress en modo interactivo
npm run cypress:run  # Ejecuta las pruebas E2E
```

### Code Quality

```bash
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige automáticamente errores de ESLint
npm run format       # Formatea el código con Prettier
npm run format:check # Verifica el formato del código
npm run type-check   # Verifica los tipos de TypeScript
```

## 🏗️ Estructura del Proyecto

```
movie-library/
├── src/
│   ├── app/                 # App Router de Next.js
│   │   ├── globals.css      # Estilos globales
│   │   ├── layout.tsx       # Layout raíz
│   │   ├── page.tsx         # Página principal
│   │   ├── page.module.css  # Estilos CSS Module para la página
│   │   └── _page.test.tsx   # Tests de la página principal
│   └── components/          # Componentes reutilizables
│       ├── Button.tsx       # Componente Button
│       ├── _Button.test.tsx # Tests del componente Button
│       ├── MovieCard.tsx    # Componente MovieCard
│       ├── MovieCard.module.css # Estilos del MovieCard
│       └── _MovieCard.test.tsx  # Tests del componente MovieCard
├── __vitest__/              # Configuración de testing unitario
│   └── setup.ts             # Configuración de Vitest
├── __cypress__/             # Pruebas E2E
│   ├── e2e/                # Pruebas end-to-end
│   └── support/            # Configuración de Cypress
├── .husky/                 # Git hooks
└── configuración...
```

**Nota**: El proyecto puede incluir scripts utilitarios locales que no se incluyen en el control de versiones.

## 🔧 Configuración

### ESLint + Prettier

El proyecto viene configurado con reglas estrictas de ESLint y Prettier para mantener la calidad del código.

### Husky Pre-commit Hooks

Antes de cada commit se ejecutan automáticamente:

- Lint y corrección automática
- Formato de código
- Verificación de tipos TypeScript
- Pruebas unitarias

### Testing

- **Vitest**: Para pruebas unitarias y de integración
- **Cypress**: Para pruebas end-to-end
- **@testing-library/react**: Para testing de componentes React
- **Coverage mínimo**: 80% en líneas, funciones, ramas y declaraciones
- **Estructura**: Tests co-localizados con prefijo `_` (ver [TESTING_CONVENTIONS.md](TESTING_CONVENTIONS.md))
- **Documentación**: Ver [COVERAGE.md](COVERAGE.md) para detalles de configuración

### TypeScript

Configuración estricta de TypeScript con:

- Resolución de módulos optimizada
- Alias de importación (`@/*` para `src/*`)
- Verificación de tipos estricta

## 🎯 Próximos Pasos

1. Instalar dependencias: `npm install`
2. Empezar a desarrollar tu aplicación de películas
3. Crear más componentes usando CSS Modules
4. Agregar más pruebas según desarrolles nuevas funcionalidades

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
