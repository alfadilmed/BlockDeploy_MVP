// Fonction utilitaire pour obtenir l'URL de l'explorateur
export const getExplorerUrl = (chainId: number | undefined, address: string, type: 'address' | 'tx' = 'address'): string => {
    let baseUrl = '';
    switch (chainId) {
        case 1: // Ethereum Mainnet
            baseUrl = 'https://etherscan.io';
            break;
        case 11155111: // Sepolia Testnet
            baseUrl = 'https://sepolia.etherscan.io';
            break;
        // Ajoutez d'autres chaînes supportées ici
        // case 5: // Goerli
        //     baseUrl = 'https://goerli.etherscan.io';
        //     break;
        // case 137: // Polygon Mainnet
        //     baseUrl = 'https://polygonscan.com';
        //     break;
        // case 80001: // Polygon Mumbai Testnet
        //     baseUrl = 'https://mumbai.polygonscan.com';
        //     break;
        // case 56: // Binance Smart Chain Mainnet
        //     baseUrl = 'https://bscscan.com';
        //     break;
        // case 97: // Binance Smart Chain Testnet
        //     baseUrl = 'https://testnet.bscscan.com';
        //     break;
        default: // Fallback générique ou erreur
            // Pour un fallback plus sûr, on pourrait ne pas retourner de lien ou un lien de recherche générique
            // ou se baser sur un explorateur multi-chaînes si disponible.
            // Pour l'instant, on retourne un lien Etherscan.io par défaut, ce qui n'est pas idéal pour les chaînes non-mainnet.
            console.warn(`getExplorerUrl: Chaîne ID ${chainId} non configurée explicitement, fallback sur etherscan.io.`);
            baseUrl = 'https://etherscan.io';
            break;
    }
    return `${baseUrl}/${type}/${address}`;
};

// Fonction utilitaire pour raccourcir les adresses
export const shortenAddress = (address: string | undefined, chars = 4): string => {
  if (!address) return '';
  if (address.length < (chars * 2 + 2)) return address; // Évite une erreur si l'adresse est trop courte
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};
