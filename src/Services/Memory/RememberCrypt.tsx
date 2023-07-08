import CryptoJS from "crypto-js";

const secretKey = "helensecret";

export function encryptData(data) {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return encodeURIComponent(ciphertext);
}

export function decryptData(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(ciphertext), secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
}
