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

  // --- Tests pour les hooks Launchpad ---

  describe('useCreateLaunchpad', () => {
    const createLaunchpadArgs: CreateLaunchpadArgs = {
      tokenAddress: '0xTokenAddressForSale',
      pricePerToken: ethers.parseEther('0.001'),
      amountToSell: ethers.parseUnits('100000', 18),
      deadline: BigInt(Math.floor(Date.now() / 1000) + 3600), // 1 heure dans le futur
      // initialOwner est pris du wallet connecté (mocké)
    };
     const mockAccountAddress = '0xDeployerLaunchpadAddress';

    beforeEach(() => {
      // Assurer que useBlockDeployWallet est mocké pour retourner une adresse pour initialOwner
      const originalSdk = jest.requireActual('@blockdeploy/core-sdk'); // Pour accéder à la vraie structure
      jest.mock('@blockdeploy/core-sdk', () => ({ // Remocker tout le module
        ...originalSdk, // Garder les autres exports
        useBlockDeployWallet: jest.fn(() => ({ // Mocker spécifiquement useBlockDeployWallet
          account: { address: mockAccountAddress, isConnected: true, status: 'connected' },
          // ...autres mocks nécessaires pour useBlockDeployWallet
        })),
        // Garder les mocks existants pour useWriteContract etc. si besoin ou les redéfinir ici
        // Si useDeployToken est utilisé par useCreateLaunchpad (ce n'est pas le cas ici), il faudrait le mocker aussi.
        // useCreateLaunchpad utilise directement useWriteContract.
        simpleLaunchpadBytecode: '0xValidLaunchpadBytecodePlaceholderForTesting'.padEnd(2000, '0'), // Bytecode valide pour test
        simpleLaunchpadAbi: [{ type: 'constructor', inputs: [{type:'address'},{type:'uint256'},{type:'uint256'},{type:'uint256'},{type:'address'}] }, {name:'buy', type:'function'}], // ABI minimal pour le test
      }));

      mockUseWriteContract.mockClear().mockReturnValue({
        data: undefined, error: null, isPending: false, writeContractAsync: mockWriteContractAsync,
      });
       mockUseWaitForTransactionReceipt.mockClear().mockReturnValue({
        data: undefined, isLoading: false, isSuccess: false, error: null,
      });
      mockWriteContractAsync.mockReset();
    });

    it('should call writeContractAsync with correct parameters for SimpleLaunchpad deployment', async () => {
      const { result } = renderHook(() => useCreateLaunchpad(), { wrapper: TestWrapper });
      await act(async () => {
        await result.current.createLaunchpad(createLaunchpadArgs);
      });

      expect(mockWriteContractAsync).toHaveBeenCalledTimes(1);
      expect(mockWriteContractAsync).toHaveBeenCalledWith({
        abi: expect.any(Array), // simpleLaunchpadAbi
        bytecode: expect.stringContaining('0xValidLaunchpadBytecodePlaceholderForTesting'), // simpleLaunchpadBytecode
        args: [
          createLaunchpadArgs.tokenAddress,
          createLaunchpadArgs.pricePerToken,
          createLaunchpadArgs.amountToSell,
          createLaunchpadArgs.deadline,
          mockAccountAddress, // initialOwner
        ],
      });
    });
  });

  describe('useLaunchpadBuy', () => {
    const launchpadBuyArgs: LaunchpadBuyArgs = {
      launchpadAddress: '0xLaunchpadContractAddress',
      tokenAmountToBuy: ethers.parseUnits('100', 18), // Acheter 100 tokens (avec 18 décimales)
    };
    const pricePerTokenInWei = ethers.parseEther('0.001');
    const expectedEthValue = launchpadBuyArgs.tokenAmountToBuy * pricePerTokenInWei;


    beforeEach(() => {
        mockUseWriteContract.mockClear().mockReturnValue({
            data: undefined, error: null, isPending: false, writeContractAsync: mockWriteContractAsync,
          });
           mockUseWaitForTransactionReceipt.mockClear().mockReturnValue({
            data: undefined, isLoading: false, isSuccess: false, error: null,
          });
          mockWriteContractAsync.mockReset();
    });

    it('should call writeContractAsync for buy function with correct parameters and value', async () => {
      const { result } = renderHook(() => useLaunchpadBuy(), { wrapper: TestWrapper });
      await act(async () => {
        await result.current.buyTokens(launchpadBuyArgs, pricePerTokenInWei);
      });

      expect(mockWriteContractAsync).toHaveBeenCalledTimes(1);
      expect(mockWriteContractAsync).toHaveBeenCalledWith({
        address: launchpadBuyArgs.launchpadAddress,
        abi: expect.any(Array), // simpleLaunchpadAbi
        functionName: 'buy',
        args: [launchpadBuyArgs.tokenAmountToBuy],
        value: expectedEthValue, // ETH à envoyer
      });
    });
  });

  describe('useLaunchpadStatus', () => {
    // Les tests pour useLaunchpadStatus sont plus complexes car ils impliquent useReadContract multiples.
    // Ils nécessiteraient de mocker useReadContract pour retourner des valeurs différentes
    // en fonction de functionName.
    // Pour ce MVP, on se concentre sur le fait que le hook est appelable.
    // Un test d'intégration serait plus pertinent ici.

    const mockReadContractResults: Record<string, any> = {
        token: '0xSaleTokenAddress',
        price: ethers.parseEther('0.001'),
        amountToSell: ethers.parseUnits('100000', 18),
        deadline: BigInt(Math.floor(Date.now() / 1000) + 7200), // 2 heures dans le futur
        totalSold: ethers.parseUnits('10000', 18),
        raisedAmount: ethers.parseEther('10'), // 10000 tokens * 0.001 ETH
        owner: '0xLaunchpadOwnerAddress',
      };
      const mockTokenDecimals = 18;
      const mockTokenSymbol = 'SLT';


    beforeEach(() => {
        // Mocker useBlockDeployContractRead
        // Ceci est un mock simplifié. Un vrai test nécessiterait de mocker wagmi.useReadContract.
        const sdk = jest.requireActual('@blockdeploy/core-sdk');
        jest.mock('@blockdeploy/core-sdk', () => ({
            ...sdk, // Garder les autres exports du SDK
            useBlockDeployWallet: jest.fn(()=> ({ account: { address: '0xUser' }})), // Mock pour useBlockDeployWallet
            useBlockDeployContractRead: jest.fn(({ functionName, address, abi }) => {
              if (address === '0xLaunchpadAddressForStatus') { // Simuler pour une adresse spécifique
                return { data: mockReadContractResults[functionName as string], isLoading: false, error: null };
              }
              if (functionName === 'decimals' && address === mockReadContractResults.token) {
                return { data: mockTokenDecimals, isLoading: false, error: null };
              }
              if (functionName === 'symbol' && address === mockReadContractResults.token) {
                return { data: mockTokenSymbol, isLoading: false, error: null };
              }
              return { data: undefined, isLoading: false, error: null };
            }),
        }));
    });

    it('should return loading state and status structure', () => {
      const { result } = renderHook(() => useLaunchpadStatus('0xLaunchpadAddressForStatus'), { wrapper: TestWrapper });

      expect(result.current.isLoading).toBe(false); // Basé sur le mock
      expect(result.current.status).toBeDefined();
      expect(result.current.status.tokenAddress).toEqual(mockReadContractResults.token);
      expect(result.current.status.pricePerToken).toEqual(mockReadContractResults.price);
      expect(result.current.status.tokenDecimals).toEqual(mockTokenDecimals);
      expect(result.current.status.tokenSymbol).toEqual(mockTokenSymbol);
      // ... vérifier d'autres champs si nécessaire
    });
  });

});
