import React from 'react';
import { useNavigate } from 'react-router-dom';

const ImageGrid = ({ images }) => {
  const navigate = useNavigate();

  const handlePlayPuzzle = (imageUrl) => {
    navigate('/puzzle', { state: { imageUrl } });
  };

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image.url} alt={`Puzzle ${index}`} />
          <button onClick={() => handlePlayPuzzle(image.url)}>Play Puzzle</button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
