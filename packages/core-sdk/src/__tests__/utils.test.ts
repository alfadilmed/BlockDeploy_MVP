import { shortenAddress } from '../utils';
import { Address } from 'viem';

describe('core-sdk/utils', () => {
  describe('shortenAddress', () => {
    it('should shorten a valid Ethereum address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678' as Address;
      expect(shortenAddress(address)).toBe('0x1234...5678');
    });

    it('should shorten a valid Ethereum address with specified characters', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678' as Address;
      expect(shortenAddress(address, 6)).toBe('0x123456...345678');
    });

    it('should return an empty string for an undefined address', () => {
      expect(shortenAddress(undefined)).toBe('');
    });

    it('should return an empty string for an invalid address (too short)', () => {
      const address = '0x12345' as Address;
      expect(shortenAddress(address)).toBe('');
    });

    it('should return an empty string for an invalid address (invalid characters)', () => {
      const address = '0x1234567890abcdef1234567890abcdef1234567g' as Address; // 'g' is invalid
      expect(shortenAddress(address)).toBe('');
    });

    it('should return an empty string for a non-hex address', () => {
      const address = 'not_an_address' as Address;
      expect(shortenAddress(address)).toBe('');
    });

    it('should return the original address if chars is too large', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678' as Address;
      expect(shortenAddress(address, 20)).toBe(address); // 20*2+2 = 42 > 40
    });

    it('should handle addresses with different casing', () => {
      const address = '0XABCDEF1234567890abcdef1234567890ABCDEF12' as Address;
      expect(shortenAddress(address)).toBe('0XABCD...EF12');
    });
  });
});
