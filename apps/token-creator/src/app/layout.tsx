'use client'; // BlockDeployProviders et les hooks wagmi sont des Client Components

// import type { Metadata } from 'next'; // Metadata ne peut être exporté d'un client component
import { Inter } from 'next/font/google';
import './globals.css';
import { BlockDeployProviders } from '@blockdeploy/core-sdk';
import AppHeader from '@/components/layout/AppHeader'; // Header spécifique à la dApp
import AppFooter from '@/components/layout/AppFooter'; // Footer spécifique à la dApp

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = { // Commenté
//   title: 'BlockDeploy - Token Creator',
//   description: 'Create your own ERC-20 tokens easily with BlockDeploy.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BlockDeploy - Token Creator</title>
        <meta name="description" content="Create your own ERC-20 tokens easily with BlockDeploy." />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <BlockDeployProviders>
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <AppFooter />
        </BlockDeployProviders>
      </body>
    </html>
  );
}
