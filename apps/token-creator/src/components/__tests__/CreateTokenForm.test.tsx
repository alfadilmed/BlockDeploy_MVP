import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateTokenForm from '../CreateTokenForm';
import { useBlockDeployWallet, useDeployToken, DeployTokenArgs, minimalERC20Bytecode } from '@blockdeploy/core-sdk';

// Mocker les hooks du core-sdk
jest.mock('@blockdeploy/core-sdk', () => {
  const originalSdk = jest.requireActual('@blockdeploy/core-sdk');
  return {
    ...originalSdk,
    useBlockDeployWallet: jest.fn(),
    useDeployToken: jest.fn(),
  };
});

// Typage pour les mocks
const mockUseBlockDeployWallet = useBlockDeployWallet as jest.Mock;
const mockUseDeployToken = useDeployToken as jest.Mock;

describe('CreateTokenForm', () => {
  let mockDeployTokenFn: jest.Mock;

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    mockDeployTokenFn = jest.fn();
    mockUseBlockDeployWallet.mockReturnValue({
      account: { isConnected: true, address: '0xTestAddress' },
      // ... autres retours nécessaires du hook wallet
    });
    mockUseDeployToken.mockReturnValue({
      deployToken: mockDeployTokenFn,
      isDeploying: false,
      isConfirming: false,
      isConfirmed: false,
      deployError: null,
      confirmationError: null,
      contractAddress: null,
      deployTxHash: null,
    });
  });

  test('renders all form fields correctly', () => {
    render(<CreateTokenForm />);
    expect(screen.getByLabelText(/Nom du Token/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Symbole du Token/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Supply Initiale/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Décimales/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Vérifier & Déployer Token/i })).toBeInTheDocument();
  });

  test('updates form fields on user input', () => {
    render(<CreateTokenForm />);
    const nameInput = screen.getByLabelText(/Nom du Token/i) as HTMLInputElement;
    const symbolInput = screen.getByLabelText(/Symbole du Token/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'My Test Token' } });
    fireEvent.change(symbolInput, { target: { value: 'MTT' } });

    expect(nameInput.value).toBe('My Test Token');
    expect(symbolInput.value).toBe('MTT');
  });

  test('submit button is disabled if wallet is not connected', () => {
    mockUseBlockDeployWallet.mockReturnValueOnce({
      account: { isConnected: false },
    });
    render(<CreateTokenForm />);
    expect(screen.getByRole('button', { name: /Connectez votre Wallet pour Déployer/i })).toBeDisabled();
  });

  test('calls deployToken with correct parameters on submit if bytecode is valid', async () => {
    // Simuler un bytecode valide pour ce test
    const originalBytecode = minimalERC20Bytecode;
    const sdk = require('@blockdeploy/core-sdk'); // Accès direct pour modifier la constante mockée
    sdk.minimalERC20Bytecode = '0x1234abcd'.repeat(20); // Assez long pour passer la vérification

    render(<CreateTokenForm />);

    fireEvent.change(screen.getByLabelText(/Nom du Token/i), { target: { value: 'Test Token' } });
    fireEvent.change(screen.getByLabelText(/Symbole du Token/i), { target: { value: 'TST' } });
    fireEvent.change(screen.getByLabelText(/Supply Initiale/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Décimales/i), { target: { value: '18' } });

    fireEvent.click(screen.getByRole('button', { name: /Vérifier & Déployer Token/i }));

    await waitFor(() => {
      expect(mockDeployTokenFn).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Token',
          symbol: 'TST',
          initialSupply: BigInt('1000000000000000000000'), // 1000 * 10^18
          // contractAbi est importé directement, bytecode est aussi importé et vérifié
        })
      );
    });
    // Restaurer le bytecode original si nécessaire pour d'autres tests (ou mocker le module config)
    sdk.minimalERC20Bytecode = originalBytecode;
  });


  test('shows error message if bytecode is a placeholder', async () => {
    // S'assurer que le bytecode est le placeholder court
    const originalBytecode = minimalERC20Bytecode;
    const sdk = require('@blockdeploy/core-sdk');
    sdk.minimalERC20Bytecode = '0x00'; // Placeholder court

    render(<CreateTokenForm />);
    fireEvent.change(screen.getByLabelText(/Nom du Token/i), { target: { value: 'Test Token' } });
    // ... remplir les autres champs ...
    fireEvent.click(screen.getByRole('button', { name: /Vérifier & Déployer Token/i }));

    await waitFor(() => {
      expect(screen.getByText(/Erreur de configuration: Le bytecode du contrat est un placeholder invalide./i)).toBeInTheDocument();
    });
    expect(mockDeployTokenFn).not.toHaveBeenCalled();
    sdk.minimalERC20Bytecode = originalBytecode;
  });


  test('displays success message and deployed address when deployment is confirmed', async () => {
    // Mettre à jour le mock de useDeployToken pour simuler une confirmation
    mockUseDeployToken.mockReturnValue({
      deployToken: mockDeployTokenFn,
      isDeploying: false,
      isConfirming: false,
      isConfirmed: true, // Simuler la confirmation
      deployError: null,
      confirmationError: null,
      contractAddress: '0xDeployedContractAddressSuccessfully', // Adresse simulée
      deployTxHash: '0xSimulatedTxHash',
    });

    render(<CreateTokenForm />);
    // Pas besoin de simuler un submit ici, on teste juste l'affichage basé sur l'état du hook
    await waitFor(() => {
      expect(screen.getByText(/Token déployé avec succès ! Adresse: 0xDeployedContractAddressSuccessfully/i)).toBeInTheDocument();
    });
  });

});
