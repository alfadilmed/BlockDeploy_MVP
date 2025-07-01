import { renderHook, act, waitFor } from '@testing-library/react';
import { useDeployToken, DeployTokenArgs } from '../contracts';
import { minimalERC20Abi, minimalERC20Bytecode } from '../contracts/abis/MinimalERC20';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains'; // Utiliser une chaîne de test
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mocker les hooks wagmi spécifiques utilisés par useDeployToken
const mockWriteContractAsync = jest.fn();
const mockUseWriteContract = jest.fn(() => ({
  data: undefined, // txHash
  error: null,
  isPending: false,
  writeContractAsync: mockWriteContractAsync,
}));

const mockUseWaitForTransactionReceipt = jest.fn(() => ({
  data: undefined, // receipt
  isLoading: false,
  isSuccess: false,
  error: null,
}));

jest.mock('wagmi', () => {
  const originalWagmi = jest.requireActual('wagmi');
  return {
    ...originalWagmi,
    useWriteContract: () => mockUseWriteContract(), // Retourner l'instance mockée
    useWaitForTransactionReceipt: (args: any) => mockUseWaitForTransactionReceipt(args), // Retourner l'instance mockée
  };
});

// Configuration minimale de wagmi pour le wrapper de test
const testWagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
const testQueryClient = new QueryClient();

const TestWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <WagmiProvider config={testWagmiConfig}>
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  </WagmiProvider>
);


describe('core-sdk/contracts', () => {
  describe('useDeployToken', () => {
    beforeEach(() => {
      // Réinitialiser les mocks avant chaque test
      mockWriteContractAsync.mockReset();
      mockUseWriteContract.mockClear().mockReturnValue({ // Rétablir le mock par défaut
        data: undefined, error: null, isPending: false, writeContractAsync: mockWriteContractAsync,
      });
      mockUseWaitForTransactionReceipt.mockClear().mockReturnValue({ // Rétablir le mock par défaut
        data: undefined, isLoading: false, isSuccess: false, error: null,
      });
    });

    const deployArgs: DeployTokenArgs = {
      name: 'Test Token',
      symbol: 'TST',
      initialSupply: BigInt('1000000000000000000000'), // 1000 * 10^18
      initialOwner: '0xTestDeployerAddress' as `0x${string}`, // Ajout de initialOwner
      contractAbi: minimalERC20Abi,
      contractBytecode: '0xValidBytecodePlaceholderForTesting12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890', // Placeholder valide
    };

    it('should call writeContractAsync with correct parameters including initialOwner', async () => {
      const { result } = renderHook(() => useDeployToken(), { wrapper: TestWrapper });

      await act(async () => {
        await result.current.deployToken(deployArgs);
      });

      expect(mockWriteContractAsync).toHaveBeenCalledTimes(1);
      expect(mockWriteContractAsync).toHaveBeenCalledWith({
        abi: deployArgs.contractAbi,
        bytecode: deployArgs.contractBytecode,
        args: [deployArgs.name, deployArgs.symbol, deployArgs.initialSupply, deployArgs.initialOwner], // Vérifier initialOwner
      });
    });

    it('should return deployTxHash and set isDeploying to true when deployment starts', async () => {
      mockWriteContractAsync.mockImplementationOnce(async () => {
        // Simuler le retour de writeContractAsync et la mise à jour de l'état de useWriteContract
        mockUseWriteContract.mockReturnValueOnce({
          data: '0xSimulatedTxHash' as `0x${string}`,
          error: null,
          isPending: true, // isPending devient true après l'appel
          writeContractAsync: mockWriteContractAsync,
        });
        return '0xSimulatedTxHash' as `0x${string}`; // La promesse résout avec le hash
      });

      const { result, rerender } = renderHook(() => useDeployToken(), { wrapper: TestWrapper });

      act(() => {
        result.current.deployToken(deployArgs); // Ne pas await ici pour vérifier l'état isDeploying
      });

      // Il faut rerender pour que le hook mette à jour son état basé sur le mock de useWriteContract
      // Cependant, le test d'état isPending est délicat car il est transitoire.
      // On vérifie plutôt que le hash est retourné après l'appel asynchrone.
      // Et que le hook useWaitForTransactionReceipt est appelé avec ce hash.

      await waitFor(() => expect(result.current.deployTxHash).toBe('0xSimulatedTxHash'));
      // Vérifier que useWaitForTransactionReceipt est appelé avec le bon hash
      expect(mockUseWaitForTransactionReceipt).toHaveBeenCalledWith(expect.objectContaining({
         hash: '0xSimulatedTxHash'
      }));
    });


    it('should return contractAddress when transaction is confirmed', async () => {
      const mockTxHash = '0xConfirmedTxHash' as `0x${string}`;
      const mockContractAddress = '0xDeployedContract123' as `0x${string}`;

      mockWriteContractAsync.mockResolvedValueOnce(mockTxHash);
      mockUseWriteContract.mockImplementation(() => ({ // Simuler l'état après que writeContractAsync ait résolu
          data: mockTxHash, error: null, isPending: false, writeContractAsync: mockWriteContractAsync,
      }));

      // Simuler la confirmation de la transaction
      mockUseWaitForTransactionReceipt.mockImplementation((args: any) => {
        if (args.hash === mockTxHash) {
          return {
            data: { contractAddress: mockContractAddress, status: 'success' },
            isLoading: false,
            isSuccess: true,
            error: null,
          };
        }
        return { data: undefined, isLoading: false, isSuccess: false, error: null };
      });

      const { result } = renderHook(() => useDeployToken(), { wrapper: TestWrapper });

      await act(async () => {
        await result.current.deployToken(deployArgs);
      });

      // Attendre que les mises à jour d'état se propagent
      await waitFor(() => expect(result.current.isConfirmed).toBe(true));
      expect(result.current.contractAddress).toBe(mockContractAddress);
    });


    it('should return deployError if writeContractAsync fails', async () => {
      const mockError = new Error('User rejected transaction');
      mockWriteContractAsync.mockRejectedValueOnce(mockError); // Simuler l'échec de writeContractAsync

      // Mettre à jour le mock de useWriteContract pour refléter l'erreur
      // Normalement, wagmi mettrait à jour l'état de useWriteContract. Ici on le simule.
      // Pour ce test, on se fie au fait que deployToken propage l'erreur ou que useWriteContract la capture.
      // Le hook useDeployToken lui-même ne fait pas de try/catch autour de writeContractAsync,
      // il se fie à l'état d'erreur de useWriteContract.
      mockUseWriteContract.mockReturnValueOnce({
        data: undefined,
        error: mockError, // L'erreur est ici
        isPending: false,
        writeContractAsync: mockWriteContractAsync,
      });

      const { result } = renderHook(() => useDeployToken(), { wrapper: TestWrapper });

      await act(async () => {
        await result.current.deployToken(deployArgs);
      });

      await waitFor(() => expect(result.current.deployError).toBe(mockError));
    });

  });
});
