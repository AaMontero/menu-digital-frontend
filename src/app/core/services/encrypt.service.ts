import CryptoJS from 'crypto-js';
import { ENCRYPT } from '../../../enviroment';
import { UserLogin } from '../models/interfaces/login.interface';
const key = CryptoJS.enc.Utf8.parse(ENCRYPT.KEY2905);
const iv = CryptoJS.enc.Utf8.parse(ENCRYPT.KEY2906);
export class encryptionService {
  encryptPassword(userData: UserLogin) {
    const plainText = JSON.stringify(userData);
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
}