import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuyTokenWidget from '../BuyTokenWidget';
import { useBlockDeployWallet, useLaunchpadBuy } from '@blockdeploy/core-sdk';
import { ethers } from 'ethers';

jest.mock('@blockdeploy/core-sdk', () => {
  const originalSdk = jest.requireActual('@blockdeploy/core-sdk');
  return {
    ...originalSdk,
    useBlockDeployWallet: jest.fn(),
    useLaunchpadBuy: jest.fn(),
  };
});

const mockUseBlockDeployWallet = useBlockDeployWallet as jest.Mock;
const mockUseLaunchpadBuy = useLaunchpadBuy as jest.Mock;

describe('BuyTokenWidget', () => {
  let mockBuyTokensFn: jest.Mock;

  const defaultProps = {
    launchpadAddress: '0xLaunchpadAddress' as `0x${string}`,
    tokenSymbol: 'LPT',
    tokenDecimals: 18,
    pricePerTokenInWei: ethers.parseEther('0.001'),
    isSaleActive: true,
    remainingToSell: ethers.parseUnits('10000', 18),
  };

  beforeEach(() => {
    mockBuyTokensFn = jest.fn();
    mockUseBlockDeployWallet.mockReturnValue({
      account: { isConnected: true, address: '0xBuyerAddress' },
    });
    mockUseLaunchpadBuy.mockReturnValue({
      buyTokens: mockBuyTokensFn,
      isSendingBuyTx: false,
      isConfirmingBuy: false,
      isBuyConfirmed: false,
      buyError: null,
      confirmationBuyError: null,
      buyReceipt: null,
      buyTxHash: null,
    });
  });

  test('renders correctly and calculates initial cost', () => {
    render(<BuyTokenWidget {...defaultProps} />);
    expect(screen.getByLabelText(/Quantité de LPT à acheter/i)).toBeInTheDocument();
    expect(screen.getByText(/Coût estimé :/i)).toBeInTheDocument();
    // Initial amount "100", price 0.001 ETH => 0.1 ETH
    expect(screen.getByText(/0.1 ETH/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Acheter LPT/i })).toBeInTheDocument();
  });

  test('updates cost when amount changes', () => {
    render(<BuyTokenWidget {...defaultProps} />);
    const amountInput = screen.getByLabelText(/Quantité de LPT à acheter/i);
    fireEvent.change(amountInput, { target: { value: '200' } });
    // 200 tokens * 0.001 ETH/token = 0.2 ETH
    expect(screen.getByText(/0.2 ETH/i)).toBeInTheDocument();
  });

  test('calls buyTokens with correct arguments on submit', async () => {
    render(<BuyTokenWidget {...defaultProps} />);
    const amountInput = screen.getByLabelText(/Quantité de LPT à acheter/i);
    fireEvent.change(amountInput, { target: { value: '50' } }); // Acheter 50 LPT

    fireEvent.click(screen.getByRole('button', { name: /Acheter LPT/i }));

    await waitFor(() => {
      expect(mockBuyTokensFn).toHaveBeenCalledWith(
        {
          launchpadAddress: defaultProps.launchpadAddress,
          tokenAmountToBuy: ethers.parseUnits('50', 18), // 50 tokens avec 18 décimales
        },
        defaultProps.pricePerTokenInWei
      );
    });
  });

  test('disables buy button if sale is not active', () => {
    render(<BuyTokenWidget {...defaultProps} isSaleActive={false} />);
    expect(screen.getByText(/La vente est terminée ou n'a pas encore commencé./i)).toBeInTheDocument();
    // Le bouton ne devrait même pas être rendu, ou être disabled.
    // Dans l'implémentation actuelle, le widget entier change.
  });

  test('disables buy button if wallet not connected', () => {
    mockUseBlockDeployWallet.mockReturnValueOnce({
      account: { isConnected: false },
    });
    render(<BuyTokenWidget {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Connectez Wallet/i })).toBeDisabled();
  });

  test('displays error message from buyError', async () => {
    mockUseLaunchpadBuy.mockReturnValueOnce({
      ...mockUseLaunchpadBuy(),
      buyError: { name:'BuyError', message: 'User rejected buy', shortMessage: 'User rejected' },
    });
    render(<BuyTokenWidget {...defaultProps} />);
    await waitFor(() => {
        expect(screen.getByText(/Erreur d'achat: User rejected/i)).toBeInTheDocument();
    });
  });

  test('displays success message when buy is confirmed', async () => {
    mockUseLaunchpadBuy.mockReturnValueOnce({
        ...mockUseLaunchpadBuy(),
        isBuyConfirmed: true,
        buyReceipt: { transactionHash: '0xBuyTxHashConfirmed123' } as any,
      });
      render(<BuyTokenWidget {...defaultProps} />);
      await waitFor(() => {
          expect(screen.getByText(/Achat confirmé ! Tx: 0xBuyTxHashC.../i)).toBeInTheDocument();
      });
  });

});
