'use client'; // BlockDeployProviders et les hooks wagmi sont des Client Components

// import type { Metadata } from 'next'; // On ne peut plus exporter metadata directement
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BlockDeployProviders } from '@blockdeploy/core-sdk';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = { // Commenté car non utilisable directement dans un Client Component Layout
//   title: 'BlockDeploy - Landing Page',
//   description: 'Welcome to BlockDeploy',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BlockDeploy - Landing</title>
        <meta name="description" content="Welcome to BlockDeploy" />
        {/* Favicon, etc. peuvent être ajoutés ici ou via le fichier next.config.js */}
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <BlockDeployProviders>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </BlockDeployProviders>
      </body>
    </html>
  );
}
