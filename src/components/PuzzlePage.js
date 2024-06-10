import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useLocation } from 'react-router-dom';

const PuzzlePage = () => {
  const { state } = useLocation();
  const { imageUrl } = state || {}; // Destructure imageUrl from state
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const maxWidth = 800; // Max width for the puzzle container
        const maxHeight = 400; // Max height for the puzzle container
        const aspectRatio = img.width / img.height;
        let width, height;

        if (aspectRatio > 2) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          width = maxHeight * aspectRatio;
          height = maxHeight;
        }

        const pieceWidth = width / 4;
        const pieceHeight = height / 2;
        const newPieces = [];
        for (let y = 0; y < 2; y++) {
          for (let x = 0; x < 4; x++) {
            newPieces.push({
              x: x * pieceWidth,
              y: y * pieceHeight,
              width: pieceWidth,
              height: pieceHeight,
              imgSrc: imageUrl,
            });
          }
        }
        setPieces(newPieces);
      };
    }
  }, [imageUrl]);

  if (!imageUrl) {
    return <div>Image not found</div>;
  }

  return (
    <div className="puzzle-page">
      <h1 className="text-center mt-6 text-2xl">Puzzle</h1>
      <div
        className="puzzle-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          maxWidth: '800px',
          margin: '20px auto',
          border: '1px solid #ccc',
        }}
      >
        {pieces.map((piece, index) => (
          <Draggable key={index}>
            <div
              style={{
                position: 'absolute',
                top: piece.y,
                left: piece.x,
                width: piece.width,
                height: piece.height,
                backgroundImage: `url(${piece.imgSrc})`,
                backgroundPosition: `-${piece.x}px -${piece.y}px`,
                backgroundSize: `${4 * piece.width}px ${2 * piece.height}px`,
                border: '1px solid #ccc',
              }}
            />
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default PuzzlePage;


