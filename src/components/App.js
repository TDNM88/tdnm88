// src/components/App.js
import React, { useState } from 'react';
import TextInput from './TextInput';
import ImageResult from './ImageResult';
import { createTextToImageJob } from '../api/tams';
import styles from '../styles/App.module.css';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const response = await createTextToImageJob(prompt);
      if (response && response.imageUrl) {
        setImageUrl(response.imageUrl);
      }
    } catch (error) {
      setError('Error generating image: ' + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.app}>
      <h1>Image Generator</h1>
      <TextInput prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} />
      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ImageResult imageUrl={imageUrl} />
    </div>
  );
};

export default App;