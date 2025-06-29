import * as CryptoJs from "crypto-js";

export function encrypt(text: string, key: string) {
  return CryptoJs.AES.encrypt(text, key).toString();
}

export function decrypt(encryptedBase64: string, key: string) {
  const decrypted = CryptoJs.AES.decrypt(encryptedBase64, key);
  try {
    const str = decrypted.toString(CryptoJs.enc.Utf8);
    if (str.length > 0) {
      return str;
    } else {
      return "Error: Decryption failed - empty result or invalid key";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return "Error: Failed to decrypt data - invalid key or corrupted data";
  }
}
