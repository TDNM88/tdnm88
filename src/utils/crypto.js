   import crypto from 'crypto';

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
