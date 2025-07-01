'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { BlockDeployProviders } from '@blockdeploy/core-sdk';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import AlphaBanner from '@/components/common/AlphaBanner';
import FeedbackButton from '@/components/common/FeedbackButton'; // Importer le bouton Feedback

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full"> {/* Assurer que html prend toute la hauteur */}
      <head>
        <title>BlockDeploy - Launchpad</title>
        <meta name="description" content="Create and participate in token launchpads with BlockDeploy." />
      </head>
      <body className={`${inter.className} flex flex-col min-h-full bg-slate-50 dark:bg-slate-900`}> {/* Assurer que body prend toute la hauteur */}
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
