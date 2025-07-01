'use client';

import Link from 'next/link';
import { useBlockDeployWallet } from '@blockdeploy/core-sdk';
import { shortenAddress } from '@/lib/utils'; // On créera ce fichier utils

export default function AppHeader() {
  const { account, connect, disconnect, connectors, isConnectingTo } = useBlockDeployWallet();
  const walletConnectConnector = connectors.find(c => c.id === 'walletConnect');
  const injectedConnector = connectors.find(c => c.id === 'injected');

  const handleConnect = () => {
    if (injectedConnector) connect({ connector: injectedConnector });
    else if (walletConnectConnector) connect({ connector: walletConnectConnector });
    else console.error('Aucun connecteur approprié trouvé.');
  };

  return (
    <header className="bg-slate-800 text-white p-4 shadow-md"> {/* Couleur différente */}
      <nav className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/launchpad" className="text-xl font-bold hover:text-slate-300 mb-2 md:mb-0">
          BlockDeploy - Launchpad
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/launchpad" className="text-sm hover:text-slate-300">Accueil Launchpads</Link>
            <Link href="/launchpad/create" className="text-sm hover:text-slate-300">Créer un Launchpad</Link>
        </div>
        <div className="flex items-center space-x-3 mt-2 md:mt-0">
          {account.isConnected && account.address ? (
            <>
              <span className="text-sm">{shortenAddress(account.address)}</span>
              <button
                onClick={() => disconnect()}
                className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 rounded-md text-white"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={handleConnect}
              disabled={account.isConnecting || isConnectingTo(walletConnectConnector?.id || '') || isConnectingTo(injectedConnector?.id || '')}
              className="px-3 py-1.5 text-sm bg-sky-500 hover:bg-sky-600 rounded-md text-white"
            >
              {account.isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
