import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1 className="text-center mt-6 text-2xl">Bem-vindo ao Puzzle e Chatbot</h1>
      <div className="button-container">
        <button
          className="button chatbot-button"
          onClick={() => navigate('/chatbot')}
        >
          Chatbot
        </button>
        <button
          className="button puzzles-button"
          onClick={() => navigate('/puzzles')}
        >
          Puzzles
        </button>
      </div>
    </div>
  );
};

export default HomePage;
