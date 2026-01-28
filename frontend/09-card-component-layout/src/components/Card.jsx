import React from 'react';

const Card = ({width, height, backgroundColor, children}) => {
  return (
    <div style={{width, height, backgroundColor}}>
      {children}
    </div>
  );
};

export default Card;
