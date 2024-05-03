// src/api/tams.js
import { generateSignature } from './signature';
import { createMD5 } from '../utils/crypto';

// Use environment variables for sensitive information
const appId = process.env.REACT_APP_TAMS_APP_ID;
const apiKey = process.env.REACT_APP_TAMS_API_KEY;
const jobUrl = 'https://ap-east-1.tensorart.cloud/v1/jobs'; // The actual Tams API endpoint URL

// Function to create a job for generating images from text prompts
export const createTextToImageJob = async (text) => {
  // Unique request ID using MD5 hash
  const requestId = createMD5(`${Date.now()}`);

  // Constructing the request payload
  const txt2imgData = {
    "request_id": requestId,
    "stages": [
      {
        "type": "INPUT_INITIALIZE",
        "inputInitialize": {
          "seed": "-1",
          "count": 1
        }
      },
      {
        "type": "DIFFUSION",
        "diffusion": {
          "width": 512,
          "height": 512,
          "prompts": [
            {
              "text": text // The user-provided text prompt
            }
          ],
          "negativePrompts": [
            {
              "text": "EasyNegative"
            }
          ],
          "sdModel": "669285003114558630",
          "sdVae": "vae-ft-mse-840000-ema-pruned.ckpt",
          "sampler": "Euler a",
          "steps": 25,
          "cfgScale": 7,
          "clipSkip": 2,
          "etaNoiseSeedDelta": 31337,
          "lora": {
            "items": [
              {
                "loraModel": "653978895017818577",
                "weight": 0.7
              }
            ]
          }
        }
      }
    ]
  };

  // Generate the signature for the request
  const authHeader = generateSignature('POST', jobUrl, appId, txt2imgData, apiKey);

  // Sending the request to the Tams API
  try {
    const response = await fetch(jobUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // Using the API key from environment variables
      },
      body: JSON.stringify(txt2imgData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jobResponse = await response.json();
    return {
      imageUrl: jobResponse.imageUrl // Assuming this is the correct property name
    };
  } catch (error) {
    console.error('Error creating text-to-image job:', error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};
