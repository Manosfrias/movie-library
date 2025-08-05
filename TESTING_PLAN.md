# Testing Plan - Movie Library

## 🎯 Objetivo General

Crear una suite de testing completa que garantice la calidad, funcionamiento y prevención de regresiones del sistema, cubriendo desde unidades individuales hasta flujos completos de usuario.

## 🗺️ Fases de Implementación

### 📦 FASE 1: TESTING UNITARIO (CORE) ✅ COMPLETADO

**Objetivo:** Verificar que las funciones individuales del dominio funcionen correctamente
**Total: 122 tests pasando**

#### 1.1 Models & Types ✅ Validado

- ✅ `Movie` model validation
- ✅ `MovieValidationError` types
- ✅ `MovieFilters` types
- ✅ `SortOptions` enums

#### 1.2 Use Cases ✅ COMPLETADO (60/60 tests)

- ✅ `CreateMovieUseCase` ✅ Ya existe (4/4 tests)
- ✅ `UpdateMovieUseCase` ✅ COMPLETADO (15/15 tests)
- ✅ `DeleteMovieUseCase` ✅ COMPLETADO (12/12 tests)
- ✅ `GetMovieByIdUseCase` ✅ COMPLETADO (14/14 tests)
- ✅ `GetAllMoviesUseCase` ✅ Ya existe (2/2 tests)
- ✅ `ToggleFavoriteUseCase` ✅ COMPLETADO (13/13 tests)

#### 1.3 Utils & Validation ✅ COMPLETADO (62/62 tests)

- ✅ `movieValidation.ts` ✅ Ya existe (19/19 tests)
- ✅ `movieFilters.ts` ✅ COMPLETADO (43/43 tests)
- ✅ `movieUtils.ts` ✅ COMPLETADO (41/41 tests)

### ✅ FASE 1: CORE LAYER COMPLETAMENTE TERMINADA

**Total: 225 tests pasando** 🏆

- Use Cases: 63 tests (60 + 3 integración)
- Utils & Validation: 103 tests
- Mappers: 59 tests

#### 1.4 Mappers ✅ COMPLETADO (59/59 tests)

- ✅ `MovieMapper.test.ts` ✅ COMPLETADO (21/21 tests) - API ↔ Domain transformations
- ✅ `StorageMapper.test.ts` ✅ COMPLETADO (38/38 tests) - Storage ↔ Domain transformations

#### 1.5 Integration ✅ COMPLETADO (3/3 tests)

- ✅ `_MovieUseCases.test.ts` ✅ COMPLETADO (3/3 tests) - Verificación de integración completa

### ✅ ToggleFavoriteUseCase INTEGRADO EN LA APLICACIÓN

- ✅ Agregado a `MovieUseCases.ts`
- ✅ Implementado en `useMovieService.ts`
- ✅ Eliminada lógica duplicada
- ✅ Arquitectura hexagonal consistente

### ⏭️ SIGUIENTE: FASE 2 - Repository Testing

### 📦 FASE 2: TESTING DE REPOSITORIOS CON MOCKS

**Objetivo:** Verificar la capa de infraestructura aisladamente

#### 2.1 Repository Tests

```typescript
// src/core/infrastructure/repositories/_LocalMovieRepository.test.ts
- ✅ Save movie to localStorage
- ✅ Load movies from localStorage
- ✅ Update existing movie
- ✅ Delete movie
- ✅ Handle empty storage
- ✅ Handle corrupted data
- ✅ Restore sample data when empty
```

#### 2.2 Service Layer Tests

```typescript
// src/ui/services/_movieService.test.ts
- 🆕 Service calls correct repository methods
- 🆕 Error propagation from repository
- 🆕 Data transformation validation
```

### 📦 FASE 3: TESTING DE INTEGRACIÓN (UI)

**Objetivo:** Verificar que los componentes UI funcionen correctamente con datos reales

#### 3.1 Context & Providers

```typescript
// src/ui/context/_MoviesContext.test.tsx
- 🆕 Initial load of movies
- 🆕 Add new movie updates state
- 🆕 Update movie updates state
- 🆕 Delete movie updates state
- 🆕 Toggle favorite updates state
- 🆕 Filters work correctly
- 🆕 Sorting works correctly
- 🆕 Loading states management
```

#### 3.2 Custom Hooks

```typescript
// src/ui/hooks/_useMovieForm.test.tsx
- 🆕 Form validation works
- 🆕 Form submission success
- 🆕 Form submission failure
- 🆕 Form reset functionality

// src/ui/hooks/_useMovieOperations.test.tsx
- 🆕 CRUD operations success/failure
- 🆕 Loading states
- 🆕 Error handling
```

#### 3.3 Components Integración

```typescript
// src/ui/components/movie-card/_MovieCard.test.tsx ✅ Ya existe (6/6 tests)
- ✅ Renders correctly
- ✅ Favorite toggle works
- 🆕 Integration with real context

// src/ui/components/movies-list/_MoviesList.test.tsx
- 🆕 Renders list of movies
- 🆕 Empty state handling
- 🆕 Loading state handling
- 🆕 Filter integration

// src/ui/components/movie-filters/_MovieFilters.test.tsx
- 🆕 All filter types work
- 🆕 Filter combinations
- 🆕 Reset filters functionality

// src/ui/components/add-movie-form/_AddMovieForm.test.tsx
- 🆕 Form submission with context
- 🆕 Validation error display
- 🆕 Success handling
```

### 📦 FASE 4: TESTING END-TO-END (CYPRESS)

**Objetivo:** Verificar flujos completos de usuario (Happy Paths)

#### 4.1 Filtrado de Películas

```typescript
// cypress/e2e/movie-filtering.cy.ts
describe('Movie Filtering', () => {
  - 🆕 Filter by search term
  - 🆕 Filter by genre
  - 🆕 Filter by favorites only
  - 🆕 Combined filters
  - 🆕 Sort by different criteria
  - 🆕 Reset all filters
})
```

#### 4.2 CRUD de Películas (Dummy Movie)

```typescript
// cypress/e2e/movie-crud.cy.ts
describe('Movie CRUD Operations', () => {
  - 🆕 Create dummy movie
  - 🆕 Verify movie appears in list
  - 🆕 Edit dummy movie
  - 🆕 Verify changes persisted
  - 🆕 Delete dummy movie
  - 🆕 Verify movie removed from list
  - 🆕 Verify no traces left in storage
})
```

#### 4.3 Navegación y UX

```typescript
// cypress/e2e/navigation.cy.ts
describe('Navigation & UX', () => {
  - 🆕 Navigate to movie details
  - 🆕 Favorite toggle from card
  - 🆕 Favorite toggle from details
  - 🆕 Modal interactions
  - 🆕 Form validation flows
})
```

## 🎯 Criterios de Éxito

### 📊 Coverage Goals

- **Unit Tests**: > 90% coverage en core/
- **Integration Tests**: > 85% coverage en ui/
- **E2E Tests**: 100% happy paths cubiertos

### 🔧 Herramientas

- **Unit/Integration**: Vitest + Testing Library
- **E2E**: Cypress
- **Coverage**: c8/vitest coverage

### 📈 Métricas

- Tests ejecutándose en < 30 segundos
- E2E tests ejecutándose en < 2 minutos
- 0 flaky tests
- Todos los tests pasando en CI/CD

## 🚀 Orden de Implementación

1. **FASE 1**: Unit Tests Core - Base sólida
2. **FASE 2**: Repository Tests - Infraestructura
3. **FASE 3**: Integration Tests UI - Componentes
4. **FASE 4**: E2E Tests - Flujos completos

---

**Estado actual:** Empezando con FASE 1 - Testing Unitario (Core)
