// src/utils/crypto.js
import crypto from 'crypto';

export const createMD5 = (data) => {
  return crypto.createHash('md5').update(data).digest('hex');
};
