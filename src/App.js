import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Images from './components/Images';
import Jumbotron from './components/Jumbotron';
import SearchField from './components/SearchField';
import PuzzlePage from './components/PuzzlePage';
import useAxios from './hooks/useAxios';
import HomePage from './components/HomePage';
import Chatbot from './components/Chatbot';

// Create Context
export const ImageContext = createContext();

function App() {
  const [searchImage, setSearchImage] = useState('Gatos');
  const { response, isLoading, error, fetchData } = useAxios(`search/photos?page=1&query=${searchImage}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);

  const value = {
    response,
    isLoading,
    error,
    fetchData,
    searchImage,
    setSearchImage
  };

  return (
    <ImageContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/puzzles" element={
            <>
              <Jumbotron>
                <SearchField />
              </Jumbotron>
              <Images />
            </>
          } />
          <Route path="/puzzle" element={<PuzzlePage />} />
        </Routes>
      </Router>
    </ImageContext.Provider>
  );
}

export default App;
