'use client'; // Les providers utilisant des hooks et du contexte doivent être des Client Components

import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './config';

// Créez un client react-query
const queryClient = new QueryClient();

interface BlockDeployProvidersProps {
  children: React.ReactNode;
  // Vous pouvez passer la config wagmi ici si vous voulez la rendre plus dynamique
  // mais pour l'instant, nous utilisons celle importée directement.
  // config?: WagmiConfig;
}

export function BlockDeployProviders({ children }: BlockDeployProvidersProps) {
  // Utilisation de WagmiProvider au lieu de WagmiConfig directement pour v2+
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Vous pourriez aussi vouloir exporter la config et le queryClient si des applications
// ont besoin d'y accéder directement, bien que ce soit moins courant pour le queryClient.
export { wagmiConfig as blockDeployWagmiConfig };
export { queryClient as blockDeployQueryClient };
