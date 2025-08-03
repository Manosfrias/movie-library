import React from 'react';
import { Inter } from 'next/font/google';
import ServerMoviesProvider from '@/ui/context/ServerMoviesProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <ServerMoviesProvider>{children}</ServerMoviesProvider>
      </body>
    </html>
  );
}
