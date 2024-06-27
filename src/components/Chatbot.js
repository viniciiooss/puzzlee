import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';  // Importando o arquivo CSS

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAskQuestion = async () => {
    try {
      const result = await axios.post('http://localhost:7860/api/predict', {
        data: [question]
      });
      setResponse(result.data.data[0]);
    } catch (error) {
      console.error('Error asking question:', error);
      setResponse('Desculpe, houve um problema ao processar sua pergunta.');
    }
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
        setQuestion(transcript);
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
    <div className="chatbot-container">
      <h2 className="chatbot-title">Assistente Virtual de Consultas sobre Autismo</h2>
      <div className="chatbot-input-container">
        <textarea
          className="chatbot-textarea"
          rows="4"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Digite sua pergunta aqui..."
        />
        <button className="chatbot-mic-button" onClick={handleListen}>
          🎤
        </button>
      </div>
      <button className="chatbot-button" onClick={handleAskQuestion}>Enviar</button>
      <div className="chatbot-response-container">
        <h3 className="chatbot-response-title">Resposta:</h3>
        <p className="chatbot-response">{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;
