'use client';

import Link from 'next/link';
import { useBlockDeployWallet } from '@blockdeploy/core-sdk';
// Importer un composant Button si nécessaire, ou utiliser un simple button stylé
// import Button from '../ui/Button';

// Fonction utilitaire pour raccourcir les adresses (peut être importée du SDK aussi)
const shortenAddress = (address: string | undefined, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};


export default function AppHeader() {
  const { account, connect, disconnect, connectors, isConnectingTo } = useBlockDeployWallet();
  const walletConnectConnector = connectors.find(c => c.id === 'walletConnect'); // ou le premier/dernier connecteur
  const injectedConnector = connectors.find(c => c.id === 'injected');


  const handleConnect = () => {
    // Priorité au connecteur injecté (MetaMask), sinon WalletConnect
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    } else if (walletConnectConnector) {
      connect({ connector: walletConnectConnector });
    } else {
      console.error('Aucun connecteur approprié trouvé.');
    }
  };


  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white hover:text-gray-300">
          BlockDeploy dApps - Token Creator
        </Link>

        <div className="flex items-center space-x-3">
          {account.isConnected && account.address ? (
            <>
              <span className="text-sm">{shortenAddress(account.address)}</span>
              <button
                onClick={() => disconnect()}
                className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 rounded-md text-white"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={handleConnect}
              disabled={account.isConnecting || isConnectingTo(walletConnectConnector?.id || '') || isConnectingTo(injectedConnector?.id || '')}
              className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 rounded-md text-white"
            >
              {account.isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
