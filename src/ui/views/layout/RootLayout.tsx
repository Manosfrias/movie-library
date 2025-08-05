import { MoviesProvider } from '@/ui/context/MoviesContext';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';
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
        {process.env.NODE_ENV === 'development' && (
          <Script src="/debug-helpers.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
