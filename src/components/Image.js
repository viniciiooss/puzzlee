import React from 'react';
import { useNavigate } from 'react-router-dom';

const Image = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/puzzle', { state: { imageUrl: data.urls.regular } });
  };

  return (
    <>
      <a href={data.urls.regular} target="_blank" rel="noreferrer">
        <img
          className="h-72 w-full object-cover rounded-lg shadow-md"
          src={data.urls.small}
          alt={data.alt_description}
        />
      </a>
      <button onClick={handleClick} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Jogar quebra-cabeça
      </button>
    </>
  );
};

export default Image;

