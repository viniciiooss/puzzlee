import React from 'react';

const Jumbutron = ({ children }) => {
  return (
    <div className="header">
      <div className='max-w-md mx-auto w-full'>
        <h1 className='text-center text-2xl font-bold mb-5'>Find Images</h1>
        {children}
      </div>
    </div>
  );
}

export default Jumbutron;
