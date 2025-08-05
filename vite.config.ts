/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__vitest__/setup.ts'],
    watch: false, // Por defecto no ejecutar en modo watch
    // Patrón para encontrar archivos de test junto a los componentes
    include: [
      '**/_*.test.{ts,tsx}',
      '**/*.test.{ts,tsx}',
      '__vitest__/**/*.test.{ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      // Configuración de coverage mínimo
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
      // Hacer que las pruebas fallen si no se cumple el umbral
      reportOnFailure: true,
      // Excluir archivos que no necesitan coverage
      exclude: [
        'node_modules/**',
        '__vitest__/**',
        '**/*.d.ts',
        '**/*.config.*',
        'coverage/**',
        '__cypress__/**',
        '.next/**',
        '**/_*.test.{ts,tsx}', // Excluir los archivos de test del coverage
        '**/*.test.{ts,tsx}', // Excluir todos los archivos de test del coverage
      ],
    },
  },
});
