// src/components/TextInput.js
import React from 'react';
import styles from '../styles/TextInput.module.css';

const TextInput = ({ prompt, setPrompt, handleSubmit }) => {
  return (
    <div className={styles.textInput}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Generate Image
      </button>
    </div>
  );
};

export default TextInput;