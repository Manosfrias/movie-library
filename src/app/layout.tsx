import type { Metadata } from 'next';
import { getText } from '../ui/hooks/useTexts';

// Metadata de la aplicación
export const metadata: Metadata = {
  title: getText.meta('title'),
  description: getText.meta('description'),
};

// Re-export del layout desde ui/views
export { default } from '../ui/views/layout/RootLayout';
