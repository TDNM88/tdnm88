// src/utils/signature.js
import crypto from 'crypto';

// Function to generate a signature for API requests
export const generateSignature = (method, url, appId, data, apiKey) => {
  // Concatenate your data into a string as required by the API
  const dataString = `${method}${url}${JSON.stringify(data)}${appId}`;

  // Create a hash using the API key
  const hash = crypto
    .createHmac('sha256', apiKey)
    .update(dataString)
    .digest('hex');

  return hash;
};

// You can include additional signature-related functions here if needed
