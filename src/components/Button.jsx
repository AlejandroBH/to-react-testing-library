import React from 'react';

const Button = ({ variant = 'primary', size = 'medium', children, onClick }) => {
  return (
    <button className={`btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
