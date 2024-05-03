// src/utils/crypto.js
import crypto from 'crypto';

export const createMD5 = (input) => {
  return crypto.createHash('md5').update(input).digest('hex');
};