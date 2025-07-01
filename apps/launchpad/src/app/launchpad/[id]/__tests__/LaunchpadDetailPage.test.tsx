import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LaunchpadDetailPage from '../page'; // Chemin relatif vers la page
import { useLaunchpadStatus, useBlockDeployWallet } from '@blockdeploy/core-sdk';
import { ethers } from 'ethers';

// Mocker les hooks et composants enfants
const mockExecuteWithdrawFunds = jest.fn();
const mockExecuteWithdrawUnsoldTokens = jest.fn();

jest.mock('@blockdeploy/core-sdk', () => {
  const originalSdk = jest.requireActual('@blockdeploy/core-sdk');
  return {
    ...originalSdk,
    useBlockDeployWallet: jest.fn(),
    useLaunchpadStatus: jest.fn(),
    useLaunchpadOwnerActions: jest.fn(() => ({ // Mock pour les actions propriétaire
      executeWithdrawFunds: mockExecuteWithdrawFunds,
      isWithdrawingFunds: false,
      isConfirmingWithdrawFunds: false,
      withdrawFundsError: null,
      isWithdrawFundsConfirmed: false,
      executeWithdrawUnsoldTokens: mockExecuteWithdrawUnsoldTokens,
      isWithdrawingTokens: false,
      isConfirmingWithdrawTokens: false,
      withdrawTokensError: null,
      isWithdrawTokensConfirmed: false,
    })),
  };
});

jest.mock('@/components/BuyTokenWidget', () => () => <div data-testid="buy-token-widget-mock">BuyTokenWidgetMock</div>);
jest.mock('@/lib/utils', () => ({
    getExplorerUrl: jest.fn((chainId, address) => `https://explorer.example.com/address/${address}`),
    shortenAddress: jest.fn((address) => address ? `${address.slice(0,6)}...${address.slice(-4)}` : ''),
}));


const mockUseBlockDeployWallet = useBlockDeployWallet as jest.Mock;
const mockUseLaunchpadStatus = useLaunchpadStatus as jest.Mock;

describe('LaunchpadDetailPage', () => {
  const mockLaunchpadId = '0xMockLaunchpadAddress1234567890';
  const mockStatus = {
    tokenAddress: '0xMockTokenAddress0987654321' as `0x${string}`,
    tokenDecimals: 18,
    tokenSymbol: 'LPT',
    pricePerToken: ethers.parseEther('0.001'),
    amountToSell: ethers.parseUnits('100000', 18),
    deadlineTimestamp: BigInt(Math.floor(Date.now() / 1000) + 3600 * 24), // Demain
    totalSold: ethers.parseUnits('25000', 18),
    raisedAmountInWei: ethers.parseEther('25'), // 25000 * 0.001
    ownerAddress: '0xMockOwnerAddress5432109876' as `0x${string}`,
    isSaleActive: true,
    remainingToSell: ethers.parseUnits('75000', 18),
  };

  beforeEach(() => {
    mockUseBlockDeployWallet.mockReturnValue({
      account: { isConnected: true, address: '0xUserAddress', chainId: 11155111 }, // Sepolia
    });
    mockUseLaunchpadStatus.mockReturnValue({
      isLoading: false,
      status: mockStatus,
    });
  });

  test('renders launchpad details when status is loaded', async () => {
    render(<LaunchpadDetailPage params={{ id: mockLaunchpadId }} />);

    // Vérifier le titre et l'adresse du contrat
    expect(screen.getByText(`Launchpad : ${mockStatus.tokenSymbol} Sale`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockLaunchpadId.slice(0,6)))).toBeInTheDocument(); // Vérifier une partie de l'adresse

    // Vérifier quelques informations clés
    expect(screen.getByText(/Token à vendre :/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockStatus.tokenSymbol))).toBeInTheDocument();
    expect(screen.getByText(/Prix :/i)).toBeInTheDocument();
    expect(screen.getByText(/0.001 ETH par LPT/i)).toBeInTheDocument();
    expect(screen.getByText(/Deadline :/i)).toBeInTheDocument();

    // Vérifier la barre de progression (implicitement via les valeurs affichées)
    expect(screen.getByText(/Progression/i)).toBeInTheDocument();
    expect(screen.getByText(/25000.0 \/ 100000.0 LPT/i)).toBeInTheDocument(); // FormatUnits par défaut

    // Vérifier la présence du widget d'achat
    expect(screen.getByTestId('buy-token-widget-mock')).toBeInTheDocument();
  });

  test('renders loading state initially', () => {
    mockUseLaunchpadStatus.mockReturnValueOnce({
      isLoading: true,
      status: {}, // Statut initial vide ou partiel
    });
    render(<LaunchpadDetailPage params={{ id: mockLaunchpadId }} />);
    expect(screen.getByText(/Chargement des détails du Launchpad.../i)).toBeInTheDocument();
  });

  test('renders error message if launchpad info cannot be loaded', () => {
    mockUseLaunchpadStatus.mockReturnValueOnce({
      isLoading: false,
      status: { tokenAddress: undefined }, // Simuler un statut où tokenAddress n'est pas trouvé
    });
    render(<LaunchpadDetailPage params={{ id: mockLaunchpadId }} />);
    expect(screen.getByText(new RegExp(`Impossible de charger les informations pour le Launchpad: ${mockLaunchpadId.slice(0,6)}`))).toBeInTheDocument();
  });

  describe('Owner Actions', () => {
    const ownerAddress = '0xMockOwnerAddress5432109876';
    beforeEach(() => {
      // Simuler que l'utilisateur connecté est le propriétaire et que la vente est terminée
      mockUseBlockDeployWallet.mockReturnValue({
        account: { isConnected: true, address: ownerAddress, chainId: 11155111 },
      });
      mockUseLaunchpadStatus.mockReturnValue({
        isLoading: false,
        status: { ...mockStatus, ownerAddress: ownerAddress as `0x${string}`, isSaleActive: false },
      });
      mockExecuteWithdrawFunds.mockClear();
      mockExecuteWithdrawUnsoldTokens.mockClear();
    });

    test('renders owner action buttons when conditions are met', () => {
      render(<LaunchpadDetailPage params={{ id: mockLaunchpadId }} />);
      expect(screen.getByRole('button', { name: /Retirer les Fonds \(ETH\)/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Retirer Tokens Invendus/i })).toBeInTheDocument();
    });

    test('calls executeWithdrawFunds when "Retirer ETH" is clicked', async () => {
      render(<LaunchpadDetailPage params={{ id: mockLaunchpadId }} />);
      const withdrawFundsButton = screen.getByRole('button', { name: /Retirer les Fonds \(ETH\)/i });
      fireEvent.click(withdrawFundsButton);
      await waitFor(() => {
        expect(mockExecuteWithdrawFunds).toHaveBeenCalledWith({ launchpadAddress: mockLaunchpadId });
      });
    });

    test('calls executeWithdrawUnsoldTokens when "Retirer Tokens Invendus" is clicked', async () => {
      render(<LaunchpadDetailPage params={{ id: mockLaunchpadId }} />);
      const withdrawTokensButton = screen.getByRole('button', { name: /Retirer Tokens Invendus/i });
      fireEvent.click(withdrawTokensButton);
      await waitFor(() => {
        expect(mockExecuteWithdrawUnsoldTokens).toHaveBeenCalledWith({ launchpadAddress: mockLaunchpadId });
      });
    });

    test('disables withdraw buttons if nothing to withdraw', () => {
      mockUseLaunchpadStatus.mockReturnValue({ // Simuler 0 ETH récoltés et 0 tokens invendus
        isLoading: false,
        status: { ...mockStatus, ownerAddress: ownerAddress as `0x${string}`, isSaleActive: false, raisedAmountInWei: 0n, remainingToSell: 0n },
      });
      render(<LaunchpadDetailPage params={{ id: mockLaunchpadId }} />);
      expect(screen.getByRole('button', { name: /Retirer les Fonds \(ETH\)/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /Retirer Tokens Invendus/i })).toBeDisabled();
    });
  });
});
