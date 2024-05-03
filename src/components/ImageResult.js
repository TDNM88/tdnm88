// src/components/ImageResult.js
import React from 'react';
import styles from '../styles/ImageResult.module.css';

const ImageResult = ({ imageUrl }) => {
  return (
    <div className={styles.imageResult}>
      {imageUrl && <img src={imageUrl} alt="Generated" className={styles.image} />}
    </div>
  );
};

export default ImageResult;