import React, { useState, useContext } from 'react';
import { ImageContext } from '../App';
import './SearchField.css';

const SearchField = () => {
  const { searchImage, setSearchImage, fetchData } = useContext(ImageContext);
  const [isListening, setIsListening] = useState(false);

  const handleSearchChange = (event) => {
    setSearchImage(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(`search/photos?page=1&query=${searchImage}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
  };

  const handleListen = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-BR';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchImage(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Seu navegador não suporta reconhecimento de voz.');
    }
  };

  return (
    <div className="search-field-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchImage}
          onChange={handleSearchChange}
          placeholder="Pesquise qualquer coisa ..."
          className="search-input"
        />
        <button type="button" className="mic-button" onClick={handleListen}>
          🎤
        </button>
        <button type="submit" className="search-button">Pesquisar</button>
      </form>
    </div>
  );
};

export default SearchField;
