'use client'; // BlockDeployProviders et les hooks wagmi sont des Client Components

// import type { Metadata } from 'next'; // Metadata ne peut être exporté d'un client component
import { Inter } from 'next/font/google';
import './globals.css';
import { BlockDeployProviders } from '@blockdeploy/core-sdk';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import AlphaBanner from '@/components/common/AlphaBanner';
import FeedbackButton from '@/components/common/FeedbackButton'; // Importer le bouton Feedback

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
          <AlphaBanner /> {/* Ajouter le bandeau ici */}
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <AppFooter />
          <FeedbackButton /> {/* Ajouter le bouton de feedback ici */}
        </BlockDeployProviders>
      </body>
    </html>
  );
}
