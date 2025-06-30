import { renderHook } from '@testing-library/react';
import { useBlockDeployWallet, useBdpTokenBalance } from '../hooks';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet } from 'wagmi/chains'; // Utiliser une chaîne pour la config de test
import React from 'react';

// Configuration minimale de wagmi pour les tests des hooks
const testConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

// Wrapper pour les tests de hooks qui ont besoin du contexte wagmi
const WagmiTestWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <WagmiProvider config={testConfig}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProvider>
);

// Mock partiel pour useAccount et useBalance car leur comportement complet est complexe à mocker
// et dépend de l'état interne de wagmi.
jest.mock('wagmi', () => {
  const originalWagmi = jest.requireActual('wagmi');
  return {
    ...originalWagmi,
    useAccount: jest.fn(() => ({
      address: '0xTestAddress',
      chainId: 1,
      isConnected: true,
      isConnecting: false,
      isDisconnected: false,
      isReconnecting: false,
      status: 'connected',
    })),
    useBalance: jest.fn((config) => {
      // Simuler un retour pour le solde BDPY si l'adresse du token est fournie dans la config du hook
      if (config?.token && config.token === require('../config').BDPY_TOKEN_ADDRESS) {
        return {
          data: {
            decimals: 18,
            formatted: '100.0',
            symbol: 'BDPY',
            value: BigInt('100000000000000000000'),
          },
          isLoading: false,
          isError: false,
          error: null,
        };
      }
      // Solde natif par défaut
      return {
        data: {
          decimals: 18,
          formatted: '1.0',
          symbol: 'ETH',
          value: BigInt('1000000000000000000'),
        },
        isLoading: false,
        isError: false,
        error: null,
      };
    }),
    useConnect: jest.fn(() => ({
        connect: jest.fn(),
        connectors: [{id: 'mockWalletConnect', name: 'Mock WalletConnect', type: 'walletConnect'}],
        error: null,
        pendingConnector: null,
        variables: null,
    })),
    useDisconnect: jest.fn(() => ({
        disconnect: jest.fn(),
    })),
  };
});


describe('core-sdk/hooks', () => {
  describe('useBdpTokenBalance', () => {
    // Test un peu plus significatif après avoir mis en place le mock
    it('should return BDPY balance data when connected and BDPY_TOKEN_ADDRESS is set', () => {
      // S'assurer que BDPY_TOKEN_ADDRESS est défini pour ce test (peut nécessiter un mock de config.ts)
      const mockConfig = require('../config');
      mockConfig.BDPY_TOKEN_ADDRESS = '0xBdpyTokenAddressForTest' as `0x${string}`;

      const { result } = renderHook(() => useBdpTokenBalance(), { wrapper: WagmiTestWrapper });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.balance).toBeDefined();
      if (result.current.balance) {
        expect(result.current.balance.symbol).toBe('BDPY'); // Dépendant du mock de useBalance
        expect(result.current.balance.formatted).toBe('100.0');
      }
       // Nettoyer le mock
       mockConfig.BDPY_TOKEN_ADDRESS = undefined;
    });

    it('should return undefined balance if BDPY_TOKEN_ADDRESS is not set', () => {
        const mockConfig = require('../config');
        mockConfig.BDPY_TOKEN_ADDRESS = undefined; // Assurer qu'il n'est pas défini

        const { result } = renderHook(() => useBdpTokenBalance(), { wrapper: WagmiTestWrapper });

        // Le query de useBalance sera disabled, donc isLoading peut être true initialement puis false sans data.
        // Le comportement exact dépend de l'implémentation de useQuery de tanstack-query.
        // Pour ce test, nous vérifions que `balance` reste undefined.
        expect(result.current.balance).toBeUndefined();
      });
  });

  describe('useBlockDeployWallet', () => {
    it('should return account information and balances', () => {
      const mockConfig = require('../config');
      mockConfig.BDPY_TOKEN_ADDRESS = '0xBdpyTokenAddressForTest' as `0x${string}`;

      const { result } = renderHook(() => useBlockDeployWallet(), { wrapper: WagmiTestWrapper });

      expect(result.current.account.isConnected).toBe(true);
      expect(result.current.account.address).toBe('0xTestAddress');
      expect(result.current.nativeBalance?.symbol).toBe('ETH');
      expect(result.current.bdpyBalance?.symbol).toBe('BDPY');
      expect(result.current.connectors.length).toBeGreaterThan(0);

      mockConfig.BDPY_TOKEN_ADDRESS = undefined;
    });
  });
});
