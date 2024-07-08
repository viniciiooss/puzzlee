import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PuzzlePage.css';

const PuzzlePage = () => {
  const { state } = useLocation();
  const { imageUrl } = state || {};
  
  const gridRows = 3; // Número de linhas do quebra-cabeça
  const gridCols = 4; // Número de colunas do quebra-cabeça

  const containerWidth = 400; // Ajuste conforme necessário
  const containerHeight = 300; // Ajuste conforme necessário

  const pieceWidth = containerWidth / gridCols;
  const pieceHeight = containerHeight / gridRows;

  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  useEffect(() => {
    if (imageUrl) {
      const grade = document.getElementById('grade');
      grade.innerHTML = ''; // Clear any existing pieces
      const newPieces = [];

      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          const novapeca = {
            id: `x${j}y${i}`,
            top: `${i * pieceHeight}px`,
            left: `${j * pieceWidth}px`,
            backgroundPosition: `-${j * pieceWidth}px -${i * pieceHeight}px`,
            backgroundImage: `url(${imageUrl})`,
            width: `${pieceWidth}px`,
            height: `${pieceHeight}px`,
          };
          newPieces.push(novapeca);
        }
      }

      setPieces(newPieces);
      embaralhar(newPieces, 100);
    }
  }, [imageUrl]);

  const handlePieceClick = (piece) => {
    if (!selectedPiece) {
      setSelectedPiece(piece);
    } else {
      if (selectedPiece !== piece) {
        trocarPeca(selectedPiece, piece);
        setSelectedPiece(null); // Clear selection after swap
      }
    }
  };

  const trocarPeca = (piece1, piece2) => {
    const newPieces = [...pieces];
    const index1 = newPieces.findIndex(p => p.id === piece1.id);
    const index2 = newPieces.findIndex(p => p.id === piece2.id);

    const tempTop = newPieces[index1].top;
    const tempLeft = newPieces[index1].left;
    newPieces[index1].top = newPieces[index2].top;
    newPieces[index1].left = newPieces[index2].left;
    newPieces[index2].top = tempTop;
    newPieces[index2].left = tempLeft;

    setPieces(newPieces);
    validar(newPieces);
  };

  const embaralhar = (pieces, argIteracoes) => {
    const newPieces = [...pieces];
    for (let i = 0; i < argIteracoes; i++) {
      let escolhido1X = 0;
      let escolhido1Y = 0;
      let escolhido2X = 0;
      let escolhido2Y = 0;

      while (escolhido1X === escolhido2X && escolhido1Y === escolhido2Y) {
        escolhido1X = Math.round(Math.random() * (gridCols - 1));
        escolhido1Y = Math.round(Math.random() * (gridRows - 1));
        escolhido2X = Math.round(Math.random() * (gridCols - 1));
        escolhido2Y = Math.round(Math.random() * (gridRows - 1));
      }
      const index1 = newPieces.findIndex(p => p.id === `x${escolhido1X}y${escolhido1Y}`);
      const index2 = newPieces.findIndex(p => p.id === `x${escolhido2X}y${escolhido2Y}`);
      const tempTop = newPieces[index1].top;
      const tempLeft = newPieces[index1].left;
      newPieces[index1].top = newPieces[index2].top;
      newPieces[index1].left = newPieces[index2].left;
      newPieces[index2].top = tempTop;
      newPieces[index2].left = tempLeft;
    }

    setPieces(newPieces);
  };

  const validar = (pieces) => {
    let quebraCabecaOk = true;
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        const posicaoXEsperada = `${j * pieceWidth}px`;
        const posicaoYEsperada = `${i * pieceHeight}px`;

        const pecaVerificada = pieces.find(p => p.id === `x${j}y${i}`);
        if (pecaVerificada.left !== posicaoXEsperada || pecaVerificada.top !== posicaoYEsperada) {
          quebraCabecaOk = false;
        }
      }
    }
    if (quebraCabecaOk) {
      window.alert('Parabéns, você conseguiu!!!');
    }
  };

  return (
    <div className="puzzle-page">
      <h1 className="title">Quebra-Cabeça</h1>
      <div 
        id="grade" 
        className="puzzle-container"
        style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
      >
        {pieces.map(piece => (
          <div
            key={piece.id}
            id={piece.id}
            className={`puzzle-piece${selectedPiece && selectedPiece.id === piece.id ? ' selected' : ''}`}
            style={{
              width: piece.width,
              height: piece.height,
              top: piece.top,
              left: piece.left,
              backgroundPosition: piece.backgroundPosition,
              backgroundImage: piece.backgroundImage,
              backgroundSize: `${containerWidth}px ${containerHeight}px`,
            }}
            onClick={() => handlePieceClick(piece)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PuzzlePage;
