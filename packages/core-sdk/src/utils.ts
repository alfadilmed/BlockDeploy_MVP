import { Address } from 'viem'; // ou ethers si vous préférez

/**
 * Shortens an Ethereum address to the format "0xABCD...WXYZ".
 * @param address The Ethereum address to shorten.
 * @param chars The number of characters to show at the beginning and end of the address (excluding "0x").
 * @returns The shortened address string, or an empty string if the address is invalid.
 */
export function shortenAddress(address?: Address, chars = 4): string {
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return '';
  }
  if (chars * 2 + 2 > address.length) { // Ensure chars is not too large
    return address;
  }
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}
