'use client';

import Link from 'next/link';
import { useBlockDeployWallet } from '@blockdeploy/core-sdk';
import Button from '../ui/Button'; // Assurez-vous que le chemin est correct

export default function Header() {
  const {
    account,
    connect,
    disconnect,
    connectors,
    isConnectingTo,
    nativeBalance, // Solde ETH natif
    bdpyBalance,   // Solde du token BDPY (avec adresse placeholder)
  } = useBlockDeployWallet();

  const injectedConnector = connectors.find(c => c.id === 'injected');
  const walletConnectConnector = connectors.find(c => c.id === 'walletConnect');

  const formatAddress = (address?: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatBalance = (balance?: { formatted: string; symbol: string }) => {
    if (!balance) return 'Loading...';
    return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`;
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300 mb-2 md:mb-0">
          BlockDeploy
        </Link>
        <ul className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-sm sm:text-base">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/features" className="hover:text-gray-300">Features</Link></li>
          <li><Link href="/roadmap" className="hover:text-gray-300">Roadmap</Link></li>
          <li><Link href="/ico" className="hover:text-gray-300">ICO</Link></li>
          <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          {account.isConnected && account.address ? (
            <div className="flex items-center space-x-2">
              <div className="text-xs sm:text-sm bg-gray-700 px-2 py-1 rounded">
                <p>Native: {formatBalance(nativeBalance)}</p>
                <p>$BDPY: {bdpyBalance ? formatBalance(bdpyBalance) : 'N/A (check console for errors)'}</p>
              </div>
              <Button onClick={() => disconnect()} variant="outline" size="sm">
                {formatAddress(account.address)} (Disconnect)
              </Button>
            </div>
          ) : (
            <>
              {injectedConnector && (
                <Button
                  onClick={() => connect({ connector: injectedConnector })}
                  disabled={isConnectingTo(injectedConnector.id)}
                  variant="secondary"
                  size="sm"
                >
                  {isConnectingTo(injectedConnector.id) ? 'Connecting...' : 'Browser Wallet'}
                </Button>
              )}
              {walletConnectConnector && (
                 <Button
                  onClick={() => connect({ connector: walletConnectConnector })}
                  disabled={isConnectingTo(walletConnectConnector.id)}
                  variant="secondary"
                  size="sm"
                >
                  {isConnectingTo(walletConnectConnector.id) ? 'Connecting...' : 'WalletConnect'}
                </Button>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
