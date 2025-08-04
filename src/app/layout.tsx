import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CaseClarity',
  description: 'El filtro inteligente para bufetes de abogados modernos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <footer className="w-full py-4 px-6 text-center text-sm text-muted-foreground">
          <Link href="/admin" className="hover:text-primary underline">Acceso Administrador</Link>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
