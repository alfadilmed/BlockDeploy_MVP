// Fonction utilitaire pour raccourcir les adresses
export const shortenAddress = (address: string | undefined, chars = 4): string => {
  if (!address) return '';
  if (address.length < (chars * 2 + 2)) return address; // Évite une erreur si l'adresse est trop courte
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};

// La fonction getExplorerUrl pourra être ajoutée ici plus tard si besoin,
// ou ce fichier pourra importer depuis un package utils partagé au niveau du monorepo.
export const getExplorerUrl = (chainId: number | undefined, address: string, type: 'address' | 'tx' = 'address'): string => {
    let baseUrl = '';
    switch (chainId) {
        case 1: // Ethereum Mainnet
            baseUrl = 'https://etherscan.io';
            break;
        case 11155111: // Sepolia Testnet
            baseUrl = 'https://sepolia.etherscan.io';
            break;
        default:
            console.warn(`getExplorerUrl: Chaîne ID ${chainId} non configurée explicitement, fallback sur etherscan.io.`);
            baseUrl = 'https://etherscan.io';
            break;
    }
    return `${baseUrl}/${type}/${address}`;
};
