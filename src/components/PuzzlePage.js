import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useLocation, useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot';

const PuzzlePage = () => {
  const { state } = useLocation();
  const { imageUrl } = state || {};
  const [pieces, setPieces] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 600, height: 600 });
  const [allCorrect, setAllCorrect] = useState(false);
  const navigate = useNavigate();

  const gridRows = 2;
  const gridCols = 2;

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const maxWidth = 600;
        const maxHeight = 600;
        const aspectRatio = img.width / img.height;
        let width, height;

        if (aspectRatio > 1) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          width = maxHeight * aspectRatio;
          height = maxHeight;
        }

        setContainerSize({ width, height });

        const pieceWidth = width / gridCols;
        const pieceHeight = height / gridRows;
        const newPieces = [];
        for (let y = 0; y < gridRows; y++) {
          for (let x = 0; x < gridCols; x++) {
            newPieces.push({
              initialX: x * pieceWidth,
              initialY: y * pieceHeight,
              width: pieceWidth,
              height: pieceHeight,
              imgSrc: imageUrl,
              x: Math.random() * (maxWidth - pieceWidth),
              y: Math.random() * (maxHeight - pieceHeight),
              correctX: x * pieceWidth,
              correctY: y * pieceHeight,
              isCorrect: false,
            });
          }
        }
        setPieces(newPieces);
        setAllCorrect(false);
      };
    }
  }, [imageUrl]);

  const handleStop = (e, data, index) => {
    const tolerance = 20;
    const newPieces = [...pieces];
    const piece = newPieces[index];
    if (
      Math.abs(data.x - piece.correctX) <= tolerance &&
      Math.abs(data.y - piece.correctY) <= tolerance
    ) {
      piece.x = piece.correctX;
      piece.y = piece.correctY;
      piece.isCorrect = true;
    } else {
      piece.x = data.x;
      piece.y = data.y;
      piece.isCorrect = false;
    }
    setPieces(newPieces);
    checkAllCorrect(newPieces);
  };

  const checkAllCorrect = (pieces) => {
    const allCorrect = pieces.every(piece => piece.isCorrect);
    setAllCorrect(allCorrect);
  };

  const handleNextPuzzle = () => {
    // Aqui você pode implementar a lógica para carregar a próxima imagem.
    navigate('/');
  };

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
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`,
          margin: '20px auto',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ position: 'relative', width: `${containerSize.width}px`, height: `${containerSize.height}px` }}>
          {pieces.map((piece, index) => (
            <Draggable
              key={index}
              defaultPosition={{ x: piece.x, y: piece.y }}
              position={piece.isCorrect ? { x: piece.correctX, y: piece.correctY } : null}
              onStop={(e, data) => handleStop(e, data, index)}
            >
              <div
                className="puzzle-piece"
                style={{
                  position: 'absolute',
                  width: piece.width,
                  height: piece.height,
                  backgroundImage: `url(${piece.imgSrc})`,
                  backgroundPosition: `-${piece.initialX}px -${piece.initialY}px`,
                  backgroundSize: `${gridCols * piece.width}px ${gridRows * piece.height}px`,
                }}
              />
            </Draggable>
          ))}
        </div>
      </div>
      {allCorrect && (
        <div className="text-center mt-4">
          <button onClick={handleNextPuzzle} className="button">
            Next Puzzle
          </button>
        </div>
      )}
      <Chatbot />
    </div>
  );
};

export default PuzzlePage;
