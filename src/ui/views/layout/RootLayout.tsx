import React from 'react';
import { Inter } from 'next/font/google';
import { MoviesProvider } from '@/ui/context/MoviesContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <MoviesProvider>{children}</MoviesProvider>
      </body>
    </html>
  );
}
