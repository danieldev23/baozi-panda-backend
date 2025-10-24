import crypto from "crypto";

// config
const config = {
  secret_key: "3f8e61b926cae3c59a9d4b52eb3f8231",
};

const { secret_key } = config;

// Base64 encoding function
export function base64Encode(data: string) {
  return Buffer.from(data).toString('base64');
}

// XOR Encryption
export function xorEncrypt(data: string, key: string) {
  let encrypted = '';
  for (let i = 0; i < data.length; i++) {
    encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return encrypted;
}

// Encrypt data
export function encryptData(data: string) {
  // Step 1: XOR encryption
  const xorEncrypted = xorEncrypt(data, secret_key);
  // Step 2: Base64 encode the XOR encrypted data
  return base64Encode(xorEncrypted);
}

// Decrypt data
export function decryptData(encryptedData: any) {
  // Step 1: Base64 decode
  const decodedData = Buffer.from(encryptedData, 'base64').toString();
  // Step 2: XOR decrypt the data
  return xorEncrypt(decodedData, secret_key);
}
