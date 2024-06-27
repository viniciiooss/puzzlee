import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1 className="text-center mt-6 text-2xl">Bem-vindo ao Puzzle e Chatbot</h1>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          className="button"
          style={{ marginRight: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white', fontSize: '16px' }}
          onClick={() => navigate('/chatbot')}
        >
          Chatbot
        </button>
        <button
          className="button"
          style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', fontSize: '16px' }}
          onClick={() => navigate('/puzzles')}
        >
          Puzzles
        </button>
      </div>
    </div>
  );
};

export default HomePage;
