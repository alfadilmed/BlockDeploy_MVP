'use client'; // BlockDeployProviders et les hooks wagmi sont des Client Components

// import type { Metadata } from 'next'; // On ne peut plus exporter metadata directement
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BlockDeployProviders } from '@blockdeploy/core-sdk';
import Script from 'next/script'; // Pour le script d'analyse

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
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  // URL du script auto-hébergé ou par défaut.
  // Pour l'auto-hébergement, vous pourriez avoir quelque chose comme '/js/script.js' et un reverse proxy.
  const plausibleScriptUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL || "https://plausible.io/js/script.js";

  return (
    <html lang="en">
      <head>
        <title>BlockDeploy - Landing</title>
        <meta name="description" content="Welcome to BlockDeploy" />
        {/* Favicon, etc. peuvent être ajoutés ici ou via le fichier next.config.js */}
        {plausibleDomain && (
          <Script
            strategy="afterInteractive" // Charger après que la page soit interactive
            defer
            data-domain={plausibleDomain}
            src={plausibleScriptUrl}
          />
        )}
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
