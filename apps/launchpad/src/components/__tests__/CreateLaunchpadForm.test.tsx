import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateLaunchpadForm from '../CreateLaunchpadForm';
import { useBlockDeployWallet, useCreateLaunchpad, simpleLaunchpadBytecode } from '@blockdeploy/core-sdk';
import { ethers } from 'ethers';

// Mocker les hooks du core-sdk
jest.mock('@blockdeploy/core-sdk', () => {
  const originalSdk = jest.requireActual('@blockdeploy/core-sdk');
  return {
    ...originalSdk,
    useBlockDeployWallet: jest.fn(),
    useCreateLaunchpad: jest.fn(),
    // Exposer le bytecode pour la vérification dans le test
    simpleLaunchpadBytecode: '0xValidLaunchpadBytecodeForTesting'.padEnd(2000, '0'),
  };
});

// Mocker ethers.getDefaultProvider().call pour simuler la récupération des décimales
const mockEthersCall = jest.fn();
jest.mock('ethers', () => {
    const originalEthers = jest.requireActual('ethers');
    return {
        ...originalEthers,
        getDefaultProvider: jest.fn(() => ({
            call: mockEthersCall,
        })),
        // garder isAddress pour la validation
        isAddress: originalEthers.isAddress
    };
});


const mockUseBlockDeployWallet = useBlockDeployWallet as jest.Mock;
const mockUseCreateLaunchpad = useCreateLaunchpad as jest.Mock;

describe('CreateLaunchpadForm', () => {
  let mockCreateLaunchpadFn: jest.Mock;

  beforeEach(() => {
    mockCreateLaunchpadFn = jest.fn();
    mockUseBlockDeployWallet.mockReturnValue({
      account: { isConnected: true, address: '0xCreatorAddress', status: 'connected' },
      chain: { id: 11155111, name: 'Sepolia', rpcUrls: { default: { http: ['https://sepolia.rpc']}}},
    });
    mockUseCreateLaunchpad.mockReturnValue({
      createLaunchpad: mockCreateLaunchpadFn,
      isDeploying: false,
      isConfirming: false,
      isConfirmed: false,
      deployError: null,
      confirmationError: null,
      newLaunchpadAddress: null, // Renommé pour correspondre au hook
      deployTxHash: null,
    });
    mockEthersCall.mockReset();
    // Simuler un retour réussi pour la récupération des décimales
    mockEthersCall.mockResolvedValue(ethers.AbiCoder.defaultAbiCoder().encode(["uint8"], [18]));
  });

  test('renders all form fields', () => {
    render(<CreateLaunchpadForm />);
    expect(screen.getByLabelText(/Adresse du Token ERC-20 à vendre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prix par Token \(en ETH\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantité de Tokens à Vendre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline de la Vente/i)).toBeInTheDocument(); // Le label englobe date et heure
    expect(screen.getByRole('button', { name: /Créer le Launchpad/i })).toBeInTheDocument();
  });

  test('validates token address field', async () => {
    render(<CreateLaunchpadForm />);
    fireEvent.change(screen.getByLabelText(/Adresse du Token ERC-20 à vendre/i), { target: { value: 'invalidaddress' } });
    fireEvent.click(screen.getByRole('button', { name: /Créer le Launchpad/i }));
    await waitFor(() => {
      expect(screen.getByText('Adresse de token invalide.')).toBeInTheDocument();
    });
  });

  test('calls createLaunchpad with correct arguments on valid submit', async () => {
    render(<CreateLaunchpadForm />);
    const tokenAddress = '0x1234567890123456789012345678901234567890';
    const price = '0.01';
    const amount = '1000';
    const date = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Demain
    const time = '12:00';

    fireEvent.change(screen.getByLabelText(/Adresse du Token ERC-20 à vendre/i), { target: { value: tokenAddress } });
    fireEvent.change(screen.getByLabelText(/Prix par Token \(en ETH\)/i), { target: { value: price } });
    fireEvent.change(screen.getByLabelText(/Quantité de Tokens à Vendre/i), { target: { value: amount } });
    fireEvent.change(screen.getByLabelText(/Deadline de la Vente/i).closest('div')?.querySelector('input[type="date"]')!, { target: { value: date } });
    fireEvent.change(screen.getByLabelText(/Deadline de la Vente/i).closest('div')?.querySelector('input[type="time"]')!, { target: { value: time } });

    fireEvent.click(screen.getByRole('button', { name: /Créer le Launchpad/i }));

    await waitFor(() => {
      expect(mockCreateLaunchpadFn).toHaveBeenCalledWith({
        tokenAddress: tokenAddress,
        pricePerToken: ethers.parseUnits(price, 'ether'),
        amountToSell: ethers.parseUnits(amount, 18), // Supposant 18 décimales mockées
        deadline: BigInt(Math.floor(new Date(`${date}T${time}`).getTime() / 1000)),
      });
    });
  });

  test('displays success message with link on confirmed deployment', async () => {
    const deployedAddr = '0xNewLaunchpadAddress123';
    mockUseCreateLaunchpad.mockReturnValue({
        createLaunchpad: mockCreateLaunchpadFn,
        isDeploying: false, isConfirming: false, isConfirmed: true, // Simuler la confirmation
        deployError: null, confirmationError: null,
        newLaunchpadAddress: deployedAddr, deployTxHash: '0xtxhash123',
      });
    render(<CreateLaunchpadForm />);
    await waitFor(() => {
        expect(screen.getByText(/Launchpad déployé avec succès !/i)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Voir votre Launchpad ici/i})).toHaveAttribute('href', `/launchpad/${deployedAddr}`);
    });
  });

});
