import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY; // تأكد من تعيين هذه القيمة في ملف .env

export const encryptText = (plainText) => {
  return CryptoJS.AES.encrypt(plainText, secretKey).toString();
};

export const decryptText = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};